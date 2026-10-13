create type public.app_role as enum ('admin');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users read own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

-- The very first account created becomes the owner/admin.
create or replace function public.assign_first_admin()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  end if;
  return new;
end $$;
create trigger on_auth_user_created_assign_admin after insert on auth.users
for each row execute function public.assign_first_admin();

create or replace function public.admin_exists()
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where role = 'admin') $$;
grant execute on function public.admin_exists() to anon, authenticated;

create table public.site_content (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);
grant select on public.site_content to anon, authenticated;
grant insert, update, delete on public.site_content to authenticated;
grant all on public.site_content to service_role;
alter table public.site_content enable row level security;
create policy "Anyone can read content" on public.site_content for select to anon, authenticated using (true);
create policy "Admins insert content" on public.site_content for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins update content" on public.site_content for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete content" on public.site_content for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

insert into public.site_content (key, value) values
('home', '{"badge":"#1 of 29 cafes in Maseno","headline":"Like coming home","headlineAccent":"for chai.","intro":"Freshly cooked Kenyan favourites, fast food and breakfast combos from KES 40 — loved by Maseno University students and locals alike.","heroImage":"","stats":[["4.0★","Google rating"],["6–9","Open every day"],["KES 40+","Meals from"],["Takeaway","& delivery"]],"reviews":[{"q":"Excellent service, tasty food and a wonderful atmosphere — a thoroughly nice place.","a":"Owen I."},{"q":"The place is too good. Great dinner spot.","a":"Samson K."},{"q":"Good food, nice atmosphere and plenty of parking.","a":"Litmusvic7"}]}'),
('menu', '{"intro":"Freshly cooked, affordable meals from KES 40. Cash only · takeaway & delivery available.","sections":[{"name":"Breakfast & Starters","price":"KES 40 – 600","items":[{"name":"Tea & Coffee","description":"Regular tea, special house coffee, milk"},{"name":"Sides & Bites","description":"Freshly made samosas, mandazi, eggs — fried, boiled or omelette"},{"name":"Breakfast combos","description":"Mix and match your morning favourites"}]},{"name":"Main Dishes & Traditional Platters","price":"KES 100 – 650 · group platters up to KES 1,800+","items":[{"name":"Fish — local favourite","description":"Deep-fried or stewed tilapia and fish fillets, with ugali and sukuma wiki or managu"},{"name":"Poultry & Meats","description":"Wet or dry fry beef, liver, chicken, gizzards and goat meat (mbuzi)"},{"name":"Starches & Cereals","description":"Rice, pilau, mukimo, githeri and yellow beans"}]},{"name":"Fast Food & Quick Bites","price":"KES 400 – 650","items":[{"name":"Burgers & Sandwiches","description":"Beef or chicken burgers, toasted sandwiches"},{"name":"Wraps & Shawarma","description":"Quick-service chicken or beef wraps"}]}]}'),
('specials', '{"items":[{"day":"Monday","deal":"House Coffee"},{"day":"Tuesday","deal":"Buy 1 Pizza, get 1 free"},{"day":"Wednesday","deal":"Buy 1 Cocktail, get 1 free"},{"day":"Friday","deal":"Buy 1 Shawarma, get 1 free"},{"day":"Saturday","deal":"1kg Nyama Choma with free ugali"},{"day":"Sunday","deal":"Family Platter — 1kg harchy, ½ chicken, free kachumbari & 1.25L soda"}]}'),
('contact', '{"name":"Mum''s cafe","phone":"+254 704 002641","hours":"Every day, 6AM – 9PM","address":"Maseno town, opposite the Jumia pick-up station\nXHRX+GHQ, Maseno, Kisumu County, Kenya","features":"Cash only · Outdoor seating · Takeaway · Delivery · Plenty of parking","lat":"-0.00867010","lng":"34.59899330"}');