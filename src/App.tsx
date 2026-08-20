import { useState, useEffect, useRef } from 'react';
import {
  Phone, MapPin, Clock, Star, ChevronDown, Menu, X,
  Pizza, UtensilsCrossed, Search,
  ArrowRight, Heart, Flame, Leaf, Award, Calendar
} from 'lucide-react';

// ─── DATA ───────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'O Nas', href: '#o-nas' },
  { label: 'Menu', href: '#menu' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Opinie', href: '#opinie' },
  { label: 'Kontakt', href: '#kontakt' },
];

const MENU_CATEGORIES = [
  {
    id: 'pizza',
    label: 'Pizza',
    icon: '🍕',
    note: 'Mała ~18cm / Duża ~30cm / Familijna ~40cm',
    items: [
      { name: 'Margherita', desc: 'Sos pomidorowy, ser gouda, pomidor, czosnek', prices: '13 / 34 / 46' },
      { name: 'Serowa', desc: 'Sos pomidorowy, ser gouda', prices: '13 / 33 / 44' },
      { name: 'Szynka', desc: 'Sos pomidorowy, ser gouda, szynka', prices: '13 / 34 / 46' },
      { name: 'Pieczarka', desc: 'Sos pomidorowy, ser gouda, pieczarki', prices: '13 / 34 / 46' },
      { name: 'Mix', desc: 'Sos pomidorowy, ser gouda, szynka, pieczarki', prices: '14 / 36 / 49' },
      { name: 'Salami', desc: 'Sos pomidorowy, ser gouda, salami', prices: '14 / 36 / 49' },
      { name: 'Kabanos', desc: 'Sos pomidorowy, ser gouda, kabanos, papryka konserwowa', prices: '14 / 36 / 49' },
      { name: 'Bekon', desc: 'Sos pomidorowy, ser żółty, pieczarki, cebula, boczek', prices: '14 / 36 / 49' },
      { name: 'Super Bekon', desc: 'Sos pomidorowy, ser gouda, pieczarki, cebula, czosnek, boczek, kiełbasa wiejska', prices: '15 / 38 / 52', badge: 'Bestseller' },
      { name: 'Pepperoni', desc: 'Sos pomidorowy, ser żółty, papryka pepperoni, salami', prices: '14 / 36 / 49' },
      { name: 'Super Pepperoni', desc: 'Sos pomidorowy, ser gouda, chilli, papryka pepperoni, papryka konserwowa, kukurydza, oliwki zielone, salami', prices: '15 / 38 / 52', badge: 'Pikantna' },
      { name: 'Kurczak', desc: 'Sos pomidorowy, ser gouda, pieczarki, cebula, kurczak', prices: '14 / 36 / 49' },
      { name: 'Super Kurczak', desc: 'Sos pomidorowy, ser gouda, papryka konserwowa, kukurydza, cebula, czosnek, pieczarki, kurczak', prices: '15 / 38 / 52' },
      { name: 'Kebab', desc: 'Sos pomidorowy, ser gouda, cebulka, kebab', prices: '15 / 38 / 52' },
      { name: 'Hawajska', desc: 'Sos pomidorowy, ser gouda, ananas, brzoskwinia, szynka', prices: '14 / 36 / 49' },
      { name: 'Diabelska', desc: 'Sos pomidorowy/meksykański, ser gouda, kukurydza, papryka konserwowa, papryka pepperoni, chilli, fasola czerwona, salami', prices: '15 / 38 / 52', badge: 'Ostra' },
      { name: 'MAX', desc: 'Sos pomidorowy, ser żółty, pieczarki, oliwki zielone, ogórek kiszony, pomidor, cebula, szynka, salami', prices: '16 / 39 / 53', badge: 'Polecamy' },
      { name: 'Wegetariańska', desc: 'Sos pomidorowy, ser gouda, pieczarki, pomidor, ogórek kiszony, papryka konserwowa, kukurydza, cebula', prices: '14 / 36 / 49', badge: 'Vege' },
      { name: 'Feta', desc: 'Sos pomidorowy, ser gouda, ser feta, pieczarki, pomidor, oliwki zielone, bazylia', prices: '15 / 38 / 52' },
      { name: 'Własna', desc: 'Sos pomidorowy, ser gouda, 5 dowolnych składników', prices: '16 / 39 / 53' },
      { name: 'Tuńczyk', desc: 'Sos pomidorowy, ser gouda, pieczarki, cebula, tuńczyk', prices: '16 / 39 / 53' },
      { name: 'Hiszpańska', desc: 'Sos pomidorowy, ser gouda, chorizo, oliwki zielone', prices: '15 / 38 / 52' },
    ],
  },
  {
    id: 'obiadowe',
    label: 'Dania Obiadowe',
    icon: '🍽️',
    items: [
      { name: 'Pierś z Kurczaka', desc: 'Panierowana pierś z kurczaka w chrupiącej panierce, zestaw surówek, frytki', prices: '27' },
      { name: 'Kotlet Schabowy', desc: 'Panierowany schab bez kości, łódeczki ziemniaczane, zestaw surówek', prices: '27' },
      { name: 'Kotlet Schabowy po Kapitańsku', desc: 'Panierowany schab, zapiekany z pieczarkami, ogórkiem kiszonym, kukurydzą, papryką czerwoną, serem żółtym', prices: '30' },
      { name: 'Placki po Węgiersku', desc: 'Placki ziemniaczane, mięso gulaszowe, sos pieczeniowy, zestaw surówek, papryka konserwowa, kukurydza', prices: '31' },
      { name: 'Placki Ziemniaczane 4szt', desc: 'Tradycyjne placki ziemniaczane', prices: '15' },
      { name: 'Placki Ziemniaczane ze Śmietaną 4szt', desc: 'Tradycyjne placki ziemniaczane podawane ze śmietaną', prices: '18' },
      { name: 'Gyros Grecki', desc: '3 rodzaje mięsa gyros, frytki, sos tzatziki, pomidor, ogórek zielony, sałata, kukurydza, cebula czerwona, grzanki', prices: '32', badge: 'Polecamy' },
      { name: 'Zupa Gulaszowa', desc: 'Podawana na wywarze z mięsem, papryka żółta, zielona i czerwona, marchewka, pieczarki, pieczywo', prices: '18' },
      { name: 'Żurek', desc: 'Tradycyjny żurek na domowym zakwasie, jajko, kiełbasa wiejska, pieczywo', prices: '15' },
    ],
  },
  {
    id: 'salatki',
    label: 'Sałatki',
    icon: '🥗',
    items: [
      { name: 'Sałatka Cezara', desc: 'Grillowana pierś z kurczaka, sałata lodowa, ogórek zielony, pomidor, grzanki, sos czosnkowy, ser parmezan', prices: '29' },
      { name: 'Sałatka Grecka', desc: 'Sałata lodowa, ogórek zielony, pomidor, krążki czerwonej cebuli, oliwki zielone i czarne, ser feta, sos winegret', prices: '27' },
      { name: 'Sałatka Gyros', desc: 'Sałata lodowa, pomidor, krążki czerwonej cebuli, grzanki, gyros grecki, sos tzatziki', prices: '31' },
    ],
  },
  {
    id: 'sniadania',
    label: 'Śniadania',
    icon: '🍳',
    items: [
      { name: 'Śniadanie Mix', desc: 'Twarożek, dwa jajka sadzone, pieczywo', prices: '16' },
      { name: 'Śniadanie MAX', desc: '120g smażonej kiełbasy, dwa jajka sadzone, pieczywo', prices: '18' },
      { name: 'Jajecznica na Maśle', desc: 'Trzy jajka smażone na maśle, pieczywo', prices: '13' },
      { name: 'Jajecznica na Boczku', desc: 'Trzy jajka smażone na boczku, pieczywo', prices: '15' },
    ],
    note: 'Dostępne: Pn–Nd 11:00–13:00',
  },
  {
    id: 'burgery',
    label: 'Burgery',
    icon: '🍔',
    items: [
      { name: 'Klasyczny', desc: 'Bułka, wołowina, sałata, pomidor, ogórek kiszony, ketchup, musztarda', prices: '29' },
      { name: 'Z Jajkiem', desc: 'Bułka, wołowina, jajko sadzone, sałata, bekon, pomidor, cebula, ser cheddar, ketchup, majonez', prices: '31' },
      { name: 'Na Ostro', desc: 'Bułka, wołowina, sałata, pomidor, ogórek kiszony, chilli, śmietana, sos chilli', prices: '31', badge: 'Pikantny' },
      { name: 'Na Słodko', desc: 'Bułka, wołowina, karmelizowana cebula, sałata, ogórek kiszony, cebula czerwona, ser gouda, bekon, masło orzechowe, ketchup, musztarda', prices: '31' },
    ],
  },
  {
    id: 'fastfood',
    label: 'Fast Food',
    icon: '🌯',
    items: [
      { name: 'Kapsalon', desc: 'Kurczak, frytki, sałata, pomidor, ogórek zielony, papryka konserwowa, cebula czerwona, ser, szczypiorek, ketchup, sos czosnkowy', prices: '24' },
      { name: 'Frytki z Serem', desc: 'Frytki, ser gouda, szczypiorek, prażona cebulka', prices: '15' },
      { name: 'Pita Kura', desc: 'Pita wypiekana na miejscu, szarpany kurczak, sałata, ogórek kiszony, pieczarki, ser gouda, sos czosnkowy', prices: '22' },
      { name: 'Pita Mięsna', desc: 'Pita wypiekana na miejscu, salami, szynka, sałata, ogórek kiszony, pieczarki, ser gouda, sos czosnkowy', prices: '22' },
      { name: 'Pita Gyros', desc: 'Pita wypiekana na miejscu, gyros, sałata, ogórek kiszony, pieczarki, ser gouda, sos czosnkowy', prices: '23' },
      { name: 'Zapieksa Klasyk', desc: 'Bułka, pieczarki, szynka, ogórek kiszony, ser gouda, kukurydza', prices: '15' },
      { name: 'Zapieksa Chorizo', desc: 'Bułka, pieczarki, chorizo, ser gouda', prices: '16' },
      { name: 'Zapieksa Kura', desc: 'Bułka, pieczarki, kurczak, ogórek kiszony, ser gouda, kukurydza, papryka konserwowa', prices: '16' },
      { name: 'Zapieksa Salami', desc: 'Bułka, pieczarki, salami, ogórek kiszony, ser gouda, kukurydza', prices: '16' },
      { name: 'Zapieksa Tuńczyk', desc: 'Bułka, pieczarki, tuńczyk, ogórek kiszony, ser gouda, kukurydza', prices: '18' },
      { name: 'Hamburger', desc: 'Bułka, mięso hamburgerowe, sałata, pomidor, ogórek kiszony, sos duński', prices: '15' },
      { name: 'Cheeseburger', desc: 'Bułka, mięso hamburgerowe, ser gouda, sałata, pomidor, ogórek kiszony, sos duński', prices: '16' },
      { name: 'Chickenburger', desc: 'Bułka, panierowany kurczak, sałata, pomidor, ogórek kiszony, sos czosnkowy', prices: '18' },
      { name: 'MAX Nuggets', desc: '6 kawałków piersi kurczaka w delikatnie pikantnej panierce, sos do wyboru', prices: '15' },
    ],
  },
  {
    id: 'kumpir',
    label: 'Kumpir',
    icon: '🥔',
    items: [
      { name: 'Z Gzikiem', desc: 'Biały twaróg, śmietana, ogórek zielony, szczypiorek', prices: '17' },
      { name: 'Z Jajkiem Sadzonym na Boczku', desc: 'Jajko sadzone, boczek, cebula czerwona, szczypiorek, sosy do wyboru', prices: '19' },
      { name: 'Z Kurczakiem', desc: 'Kurczak, ser gouda, papryka konserwowa, kukurydza, cebula czerwona, szczypiorek, sosy do wyboru', prices: '19' },
      { name: 'Z Gyrosem', desc: 'Mięso gyros, ser gouda, pomidor, ogórek zielony, cebula czerwona, szczypiorek, sosy do wyboru', prices: '20' },
      { name: 'Po Meksykańsku', desc: 'Mięso mielone wołowe, ser gouda, fasola czerwona, kukurydza, papryka konserwowa, cebula czerwona, szczypiorek, sosy do wyboru', prices: '19' },
    ],
  },
  {
    id: 'zawijasy',
    label: 'Zawijasy',
    icon: '🌮',
    items: [
      { name: 'Tortilla Klasyk', desc: 'Placek pszenny, panierowany kurczak, sałata, pomidor, cebula, ogórek zielony, sos czosnkowy', prices: '23' },
      { name: 'Tortilla Gyros', desc: 'Placek pszenny, gyros, sałata, pomidor, cebula, ogórek zielony, sos czosnkowy', prices: '23' },
      { name: 'Tortilla Meksyk', desc: 'Placek pszenny, panierowany kurczak, sałata, kukurydza, papryka czerwona, fasola czerwona, cebula, chilli, sos chilli', prices: '23', badge: 'Pikantna' },
      { name: 'Quesadilla Kura', desc: 'Dwa placki pszenne zapiekane z sosem pomidorowym, szarpanym kurczakiem, serem gouda, cebulą, papryką konserwową, kukurydzą', prices: '23' },
      { name: 'Quesadilla Salami', desc: 'Dwa placki pszenne zapiekane z sosem pomidorowym, salami, serem gouda, cebulą, papryką konserwową, kukurydzą', prices: '23' },
      { name: 'Tacos', desc: 'Zwinięty placek pszenny, mielone mięso wołowe, pomidor, kukurydza, sałata, ser gouda, śmietana, nachos', prices: '18' },
    ],
  },
  {
    id: 'dodatki',
    label: 'Dodatki',
    icon: '🍟',
    items: [
      { name: 'Frytki 100g', desc: 'Chrupiące frytki', prices: '9' },
      { name: 'Opiekane Ziemniaczki 100g', desc: 'Ziemniaczki pieczone w piekarniku', prices: '10' },
      { name: 'Zestaw Surówek', desc: 'Sezonowe surówki warzywne', prices: '8' },
      { name: 'Sos', desc: 'Ketchup, sos czosnkowy, meksykański, piri piri', prices: '3' },
      { name: 'Zestaw Sosów', desc: 'Czosnkowy, meksykański, ketchup', prices: '7' },
      { name: 'Dodatek do Pizzy Mała (18cm)', desc: 'Dodatkowy składnik do pizzy małej', prices: '2' },
      { name: 'Dodatek do Pizzy Duża (30cm)', desc: 'Dodatkowy składnik do pizzy dużej', prices: '3' },
      { name: 'Dodatek do Pizzy Familijna (40cm)', desc: 'Dodatkowy składnik do pizzy familijnej', prices: '4' },
    ],
  },
];

const FEATURED = [
  {
    name: 'Pizza MAX',
    desc: 'Nasz flagowy wybór — sos pomidorowy, ser żółty, pieczarki, oliwki, ogórek kiszony, pomidor, cebula, szynka, salami.',
    price: 'od 16 zł',
    img: 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Polecamy',
  },
  {
    name: 'Super Bekon',
    desc: 'Sos pomidorowy, ser gouda, pieczarki, cebula, czosnek, boczek i kiełbasa wiejska — uczta dla miłośników mięsa.',
    price: 'od 15 zł',
    img: 'https://images.pexels.com/photos/6223183/pexels-photo-6223183.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Bestseller',
  },
  {
    name: 'Gyros Grecki',
    desc: 'Trzy rodzaje mięsa gyros, frytki, sos tzatziki, świeże warzywa i chrupiące grzanki.',
    price: '32 zł',
    img: 'https://images.pexels.com/photos/29285467/pexels-photo-29285467.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Nowość',
  },
];

const GALLERY_IMAGES = [
  { src: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Świeża pizza z dodatkami' },
  { src: 'https://images.pexels.com/photos/1260968/pexels-photo-1260968.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Pizza z mozzarellą i bazylią' },
  { src: 'https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Burger z frytkami' },
  { src: 'https://images.pexels.com/photos/29285458/pexels-photo-29285458.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Gyros z frytkami i warzywami' },
  { src: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Frytki z sosem serowym' },
  { src: 'https://images.pexels.com/photos/11286814/pexels-photo-11286814.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Doner kebab w cieście' },
  { src: 'https://images.pexels.com/photos/4193883/pexels-photo-4193883.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Sałatka grecka z fetą' },
  { src: 'https://images.pexels.com/photos/4109111/pexels-photo-4109111.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Pizza z boczkiem i mięsem' },
  { src: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Makaron z warzywami' },
  { src: 'https://images.pexels.com/photos/36750270/pexels-photo-36750270.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Cheeseburger z frytkami' },
  { src: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Soczysta pizza z serem' },
  { src: 'https://images.pexels.com/photos/3219547/pexels-photo-3219547.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Talerz z daniami głównymi' },
];

const REVIEWS = [
  { name: 'Marek W.', rating: 5, text: 'Najlepsza pizza w Mielcu! Ciasto idealne, składniki świeże, obsługa szybka i miła. Stały klient od lat.', date: 'Czerwiec 2025' },
  { name: 'Ania K.', rating: 5, text: 'Pizza MAX to absolutny hit — polecam każdemu. Ceny bardzo przystępne jak na tak dobrą jakość.', date: 'Maj 2025' },
  { name: 'Tomasz R.', rating: 5, text: 'Byliśmy na rodzinnym obiedzie — wszyscy zachwyceni! Placki po węgiersku i gyros grecki to musisz spróbować!', date: 'Lipiec 2025' },
  { name: 'Piotr S.', rating: 4, text: 'Pizza smaczna, ale czekałem na zamówienie trochę za długo. Warto jednak zajrzeć — klimat i obsługa bardzo mili.', date: 'Marzec 2025' },
];

const HOURS = [
  { days: 'Poniedziałek – Piątek', time: '14:00 – 23:00' },
  { days: 'Sobota – Niedziela', time: '11:00 – 23:00' },
];

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className={i < count ? 'star-filled fill-current' : 'text-gray-600'} />
      ))}
    </div>
  );
}

function BadgePill({ label }: { label: string }) {
  const colors: Record<string, string> = {
    Bestseller: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    Polecamy: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    Vege: 'bg-green-500/20 text-green-400 border-green-500/30',
    Pikantna: 'bg-red-500/20 text-red-400 border-red-500/30',
    Pikantny: 'bg-red-500/20 text-red-400 border-red-500/30',
    Ostra: 'bg-red-500/20 text-red-400 border-red-500/30',
    Nowość: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  };
  const cls = colors[label] ?? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
  return (
    <span className={`text-[10px] font-heading tracking-wider px-2 py-0.5 rounded-full border ${cls}`}>
      {label}
    </span>
  );
}

// ─── SECTIONS ───────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/95 backdrop-blur-xl shadow-2xl' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center teal-glow group-hover:scale-110 transition-transform">
            <Pizza size={18} className="text-black" />
          </div>
          <div>
            <span className="font-heading text-xl tracking-widest text-white">MAX</span>
            <span className="font-heading text-xl tracking-widest gradient-text ml-1">PIZZA</span>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="font-heading text-sm tracking-widest text-gray-300 hover:text-cyan-400 transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a
            href="tel:175832030"
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-heading font-semibold text-sm tracking-wider px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-cyan-500/30 transition-all hover:scale-105"
          >
            <Phone size={14} />
            Rezerwacja
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-black/98 backdrop-blur-xl border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-heading text-sm tracking-widest text-gray-300 hover:text-cyan-400 transition-colors py-2"
            >
              {l.label}
            </a>
          ))}
          <a
            href="tel:175832030"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-heading font-semibold text-sm tracking-wider px-5 py-3 rounded-full"
          >
            <Phone size={14} />
            Zadzwoń
          </a>
        </div>
      </div>
    </nav>
  );
}

function FksGear({ cx, cy, r, innerR, teeth, toothH, fill }: {
  cx: number; cy: number; r: number; innerR: number; teeth: number; toothH: number; fill: string;
}) {
  const pts: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a0 = ((i - 0.3) / teeth) * Math.PI * 2;
    const a1 = ((i + 0.3) / teeth) * Math.PI * 2;
    const a2 = ((i + 0.7) / teeth) * Math.PI * 2;
    const a3 = ((i + 1.3) / teeth) * Math.PI * 2;
    const rOut = r + toothH;
    const cos = Math.cos, sin = Math.sin;
    pts.push(
      `${cx + innerR * cos(a0)},${cy + innerR * sin(a0)} ` +
      `${cx + rOut * cos(a1)},${cy + rOut * sin(a1)} ` +
      `${cx + rOut * cos(a2)},${cy + rOut * sin(a2)} ` +
      `${cx + innerR * cos(a3)},${cy + innerR * sin(a3)}`
    );
  }
  return (
    <polygon points={pts.join(' ')} fill={fill} />
  );
}

function GearSVG({
  cx,
  cy,
  r,
  teeth,
  toothH,
  toothW,
  stroke,
  strokeOp,
  fill,
  strokeW,
}: {
  cx: number;
  cy: number;
  r: number;
  teeth: number;
  toothH: number;
  toothW: number;
  stroke: string;
  strokeOp: number;
  fill: string;
  strokeW: number;
}) {
  const path: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a = (i / teeth) * Math.PI * 2;
    const aHalf = ((i + 0.5) / teeth) * Math.PI * 2;
    const aNext = ((i + 1) / teeth) * Math.PI * 2;
    const rOut = r + toothH;
    const x1 = cx + r * Math.cos(a);
    const y1 = cy + r * Math.sin(a);
    const x1o = cx + rOut * Math.cos(a);
    const y1o = cy + rOut * Math.sin(a);
    const xh = cx + rOut * Math.cos(aHalf);
    const yh = cy + rOut * Math.sin(aHalf);
    const x2 = cx + r * Math.cos(aNext);
    const y2 = cy + r * Math.sin(aNext);
    const x2o = cx + rOut * Math.cos(aNext);
    const y2o = cy + rOut * Math.sin(aNext);
    path.push(`M ${x1} ${y1} L ${x1o} ${y1o} L ${xh} ${yh} L ${x2o} ${y2o} L ${x2} ${y2}`);
  }
  return (
    <g
      stroke={stroke}
      strokeWidth={strokeW}
      strokeOpacity={strokeOp}
      fill={fill}
      fillOpacity={0}
      strokeLinejoin="round"
    >
      <circle cx={cx} cy={cy} r={r} />
      <path d={path.join(' ')} />
    </g>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dark background */}
      <div className="absolute inset-0 bg-[#07090a]" />

      {/* FKS Stal Mielec logo watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <svg
          viewBox="0 0 400 400"
          className="w-[1100px] h-[1100px] opacity-[0.20]"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* ── Outer gear ring ── */}
          <FksGear cx={200} cy={200} r={178} innerR={152} teeth={24} toothH={22} fill="#e8e8e8" />

          {/* Grey ring inside gear */}
          <circle cx="200" cy="200" r="152" fill="#b0b0b0" />
          <circle cx="200" cy="200" r="138" fill="#1a1a1a" />

          {/* Inner white circle */}
          <circle cx="200" cy="200" r="136" fill="#d8d8d8" />

          {/* Dark grey fill for logo interior */}
          <circle cx="200" cy="200" r="128" fill="#7a7a7a" />

          {/* Horizon line / ground plane */}
          <ellipse cx="200" cy="232" rx="100" ry="14" fill="#404040" />
          <rect x="100" y="218" width="200" height="36" fill="#404040" rx="2" />

          {/* ── Lathe / turning tool shape ── */}
          {/* Arrow body pointing left */}
          <polygon points="60,195 155,175 155,215" fill="#1a1a1a" />
          {/* Arrow tip */}
          <polygon points="60,195 80,184 80,206" fill="#c8c8c8" />

          {/* Fan / spray burst (top-right quadrant) */}
          {[0,12,24,36,48,60].map((deg, i) => {
            const base = -30;
            const angle = (base + deg) * Math.PI / 180;
            const x2 = 200 + Math.cos(angle) * (55 + i * 10);
            const y2 = 200 + Math.sin(angle) * (55 + i * 10);
            return (
              <line
                key={i}
                x1="200" y1="195"
                x2={x2} y2={y2}
                stroke="#e8e8e8"
                strokeWidth={5 - i * 0.6}
                strokeLinecap="round"
                opacity={1 - i * 0.12}
              />
            );
          })}
          {/* Fan base circle */}
          <circle cx="200" cy="195" r="8" fill="#e8e8e8" />

          {/* ── Text: FKS STAL MIELEC along top arc ── */}
          <defs>
            <path id="topArc" d="M 42,200 A 158,158 0 0 1 358,200" />
            <path id="botArc" d="M 68,230 A 132,132 0 0 0 332,230" />
          </defs>
          <text fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="22" fill="#1a1a1a" letterSpacing="4">
            <textPath href="#topArc" startOffset="50%" textAnchor="middle">FKS STAL MIELEC</textPath>
          </text>
          {/* ── Text: 1939 along bottom arc ── */}
          <text fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="22" fill="#1a1a1a" letterSpacing="6">
            <textPath href="#botArc" startOffset="50%" textAnchor="middle">1939</textPath>
          </text>
        </svg>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />

      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 py-32">
        {/* Since badge */}
        <div className="inline-flex items-center gap-2 glass border border-cyan-400/20 rounded-full px-4 py-2 mb-8 animate-fade-in-up">
          <Award size={14} className="text-cyan-400" />
          <span className="font-heading text-xs tracking-[0.2em] text-cyan-400">OD 1999 ROKU W MIELCU</span>
        </div>

        <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white mb-4 leading-none animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          MAX<br />
          <span className="gradient-text teal-glow-text">PIZZA</span>
        </h1>

        <p className="font-display text-lg sm:text-xl text-gray-300 max-w-xl mx-auto mt-6 mb-10 leading-relaxed italic animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Smak, który pamiętasz. Tradycja w każdym kęsie.<br />Pizza & Drink Bar w sercu Mielca.
        </p>

        {/* Phone — big and visible */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <a
            href="tel:175832030"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-400 to-cyan-500 text-black font-heading font-bold text-2xl sm:text-3xl tracking-wider px-8 sm:px-12 py-5 sm:py-6 rounded-2xl phone-pulse hover:scale-105 transition-transform duration-300 shadow-2xl"
          >
            <Phone size={28} className="flex-shrink-0" />
            17 583 20 30
          </a>
          <p className="text-gray-400 text-sm mt-3 font-heading tracking-wider">ZADZWOŃ I ZAMÓW JUŻ TERAZ</p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <a
            href="#menu"
            className="flex items-center justify-center gap-2 bg-white/10 border border-white/20 backdrop-blur text-white font-heading tracking-wider text-sm px-8 py-4 rounded-full hover:bg-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300"
          >
            <UtensilsCrossed size={16} />
            Zobacz Menu
          </a>
          <a
            href="#galeria"
            className="flex items-center justify-center gap-2 text-gray-400 font-heading tracking-wider text-sm px-8 py-4 hover:text-cyan-400 transition-colors"
          >
            Galeria
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span className="font-heading text-xs tracking-[0.2em] text-gray-400">PRZEWIŃ</span>
          <ChevronDown size={20} className="text-cyan-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

function About() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  return (
    <section id="o-nas" className="py-28 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-400/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Images grid */}
        <div className="relative">
          <div className="grid grid-cols-1 gap-4">
            <button
              type="button"
              onClick={() => setLightbox({ src: '/images/restaurant/Zrzut_ekranu_2026-08-20_111037.png', alt: 'Karta dań MAX PIZZA' })}
              className="rounded-2xl overflow-hidden min-h-64 sm:min-h-72 bg-[#111] border border-white/10 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 block w-full"
              aria-label="Powiększ zdjęcie wnętrza MAX PIZZA"
            >
              <img
                src="/images/restaurant/Zrzut_ekranu_2026-08-20_111037.png"
                alt="Karta dań MAX PIZZA"
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-700"
              />
            </button>
            <button
              type="button"
              onClick={() => setLightbox({ src: '/images/restaurant/Zrzut_ekranu_2026-08-20_111116.png', alt: 'Karta dań MAX PIZZA — druga strona' })}
              className="rounded-2xl overflow-hidden min-h-64 sm:min-h-72 bg-[#111] border border-white/10 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 block w-full"
              aria-label="Powiększ zdjęcie baru MAX PIZZA"
            >
              <img
                src="/images/restaurant/Zrzut_ekranu_2026-08-20_111116.png"
                alt="Karta dań MAX PIZZA — druga strona"
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-700"
              />
            </button>
          </div>
          {/* Since badge */}
          <div className="absolute -bottom-4 -right-4 glass-dark rounded-2xl px-6 py-4 text-center teal-glow">
            <div className="gradient-text font-heading font-bold text-3xl">1999</div>
            <div className="text-gray-400 text-xs font-heading tracking-widest mt-1">ROK ZAŁOŻENIA</div>
          </div>

          {lightbox && (
            <div
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
              onClick={() => setLightbox(null)}
              role="dialog"
              aria-modal="true"
              aria-label="Powiększone zdjęcie"
            >
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="absolute top-6 right-6 text-white hover:text-cyan-400 transition-colors p-2"
                aria-label="Zamknij powiększone zdjęcie"
              >
                <X size={32} />
              </button>
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                className="max-w-full max-h-[90vh] rounded-2xl object-contain"
                onClick={event => event.stopPropagation()}
              />
            </div>
          )}
        </div>

        {/* Text */}
        <div>
          <div className="section-line">
            <span className="font-heading text-xs tracking-[0.3em] text-cyan-400">O RESTAURACJI</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mt-4 mb-6 leading-tight">
            Ponad 25 lat<br />tradycji i smaku
          </h2>
          <p className="text-gray-400 leading-relaxed mb-6 text-base">
            MAX Pizza & Drink Bar to miejsce z duszą — działamy w Mielcu od 1999 roku, serwując autentyczne, domowe smaki przygotowywane z pasją i najwyższej jakości składników. Przez lata staliśmy się ulubionym miejscem spotkań dla setek rodzin i przyjaciół.
          </p>
          <p className="text-gray-400 leading-relaxed mb-10 text-base">
            Nasze ciasto wyrabiamy codziennie według oryginalnej receptury, a każda pizza i każde danie przygotowywane są na zamówienie — świeże, aromatyczne i pełne smaku. Zapraszamy całe rodziny, grupy przyjaciół i wszystkich łakomych.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            {[
              { icon: <Award className="text-cyan-400" size={22} />, value: '25+', label: 'Lat doświadczenia' },
              { icon: <Heart className="text-cyan-400" size={22} />, value: '22', label: 'Rodzajów pizzy' },
              { icon: <Flame className="text-cyan-400" size={22} />, value: '100%', label: 'Świeże składniki' },
            ].map(s => (
              <div key={s.label} className="glass rounded-xl p-4 text-center hover-lift">
                <div className="flex justify-center mb-2">{s.icon}</div>
                <div className="font-heading text-2xl font-bold text-white">{s.value}</div>
                <div className="text-gray-500 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Pen signature */}
          <div className="mt-10 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
            <div className="text-center">
              <p className="font-pen text-3xl sm:text-4xl text-cyan-300 pen-signature pen-underline italic">
                Grzegorz Lato poleca
              </p>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Featured() {
  return (
    <section className="py-28 bg-[#080808] relative overflow-hidden">
      <div className="absolute -right-40 top-0 w-[600px] h-[600px] rounded-full bg-cyan-400/4 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="section-line-center">
            <span className="font-heading text-xs tracking-[0.3em] text-cyan-400">NASZE SPECJALNOŚCI</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mt-4">
            Polecane dania
          </h2>
          <p className="text-gray-300 mt-4 max-w-lg mx-auto">Odkryj nasze flagowe pozycje, które zachwycają gości od lat</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {FEATURED.map((item, i) => (
            <article
              key={i}
              className="group relative rounded-2xl overflow-hidden bg-[#111] border border-white/5 hover-lift cursor-default"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 z-10">
                  <BadgePill label={item.badge} />
                </div>
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#111]/80 via-[#111]/15 to-transparent" />
              </div>
              <div className="relative z-10 bg-[#111] p-6">
                <h3 className="font-heading text-xl font-bold !text-white mb-2">{item.name}</h3>
                <p className="text-gray-100 text-sm leading-relaxed mb-4">{item.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-cyan-300 font-heading font-bold text-lg">{item.price}</span>
                  <a
                    href="#menu"
                    className="text-xs font-heading tracking-wider text-cyan-300 hover:text-cyan-200 transition-colors flex items-center gap-1"
                  >
                    Zobacz menu <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  const isAllCategory = activeCategory === 'all';
  const currentCat = MENU_CATEGORIES.find(c => c.id === activeCategory);

  const allItems = MENU_CATEGORIES.flatMap(cat =>
    cat.items.map(item => ({ ...item, categoryLabel: cat.label }))
  );

  const sourceItems = isAllCategory
    ? allItems
    : currentCat!.items.map(item => ({ ...item, categoryLabel: currentCat!.label }));

  const filtered = sourceItems.filter(item =>
    search === '' ||
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.desc.toLowerCase().includes(search.toLowerCase())
  );

  const isPizzaSection = activeCategory === 'pizza';
  const isPizzaItem = (prices: string) => prices.includes(' / ');

  const tabs = [{ id: 'all', label: 'Wszystko', icon: '🍴' }, ...MENU_CATEGORIES];

  const groups = isAllCategory
    ? MENU_CATEGORIES.map(cat => ({
        label: cat.label,
        icon: cat.icon,
        items: filtered.filter(i => i.categoryLabel === cat.label),
      })).filter(g => g.items.length > 0)
    : null;

  const renderItem = (item: typeof filtered[number], key: number) => (
    <div
      key={key}
      className="menu-item group flex items-start justify-between gap-4 px-5 py-4 rounded-xl border border-white/5 transition-all duration-200 cursor-default"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-heading text-base text-white group-hover:text-cyan-300 transition-colors">{item.name}</span>
          {item.badge && <BadgePill label={item.badge} />}
        </div>
        <p className="text-gray-600 text-xs mt-1 leading-relaxed">{item.desc}</p>
      </div>
      <div className="text-right flex-shrink-0">
        {isPizzaItem(item.prices) ? (
          <div className="text-xs font-heading text-gray-400 whitespace-nowrap">
            {item.prices.split(' / ').map((p, pi) => (
              <span key={pi}>
                <span className={pi === 0 ? 'text-gray-400' : pi === 1 ? 'text-cyan-400' : 'text-cyan-300'}>{p}</span>
                {pi < 2 && <span className="text-gray-700 mx-1">/</span>}
              </span>
            ))} <span className="text-gray-600">zł</span>
          </div>
        ) : (
          <span className="gradient-text font-heading font-bold text-base whitespace-nowrap">{item.prices} zł</span>
        )}
      </div>
    </div>
  );

  return (
    <section id="menu" className="py-28 bg-[#0a0a0a] relative">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="section-line-center">
            <span className="font-heading text-xs tracking-[0.3em] text-cyan-400">KARTA DAN</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mt-4">Nasze Menu</h2>
          <p className="text-gray-500 mt-3">Wszystkie dania przygotowywane świeże, na zamówienie</p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-10">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Szukaj dania..."
            className="w-full bg-white/5 border border-white/10 rounded-full pl-11 pr-5 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400/50 focus:bg-cyan-400/5 transition-all"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {tabs.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setSearch(''); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-heading text-xs tracking-wider transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-cyan-400/30'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Category note */}
        {!isAllCategory && currentCat?.note && (
          <p className="text-center text-cyan-400/70 text-sm font-heading tracking-wider mb-8">
            {currentCat.note}
          </p>
        )}

        {/* Pizza price header */}
        {isPizzaSection && (
          <div className="hidden sm:grid grid-cols-[1fr_auto] gap-4 max-w-3xl mx-auto mb-3 px-4 text-xs font-heading tracking-widest text-gray-600">
            <span>POZYCJA</span>
            <span className="text-right">MAŁA / DUŻA / FAMILIJNA</span>
          </div>
        )}

        {/* Menu items */}
        <div className="max-w-3xl mx-auto space-y-1">
          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-600">
              <UtensilsCrossed size={40} className="mx-auto mb-4 opacity-40" />
              <p className="font-heading tracking-wider">Brak wyników dla "{search}"</p>
            </div>
          )}

          {isAllCategory && groups ? (
            groups.map((group, gi) => (
              <div key={gi} className="mb-8">
                <div className="flex items-center gap-2 mb-3 px-5">
                  <span className="text-lg">{group.icon}</span>
                  <span className="font-heading text-sm tracking-widest text-cyan-400">{group.label}</span>
                  <div className="h-px flex-1 bg-white/5" />
                </div>
                <div className="space-y-1">
                  {group.items.map((item, i) => renderItem(item, i))}
                </div>
              </div>
            ))
          ) : (
            filtered.map((item, i) => renderItem(item, i))
          )}
        </div>

        {/* Pizza note */}
        {isPizzaSection && (
          <p className="text-center text-gray-600 text-xs mt-8 font-heading tracking-wider">
            DODATKI: Mała +2 zł · Duża +3 zł · Familijna +4 zł za składnik
          </p>
        )}
      </div>
    </section>
  );
}

function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="galeria" className="py-28 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="section-line-center">
            <span className="font-heading text-xs tracking-[0.3em] text-cyan-400">WNĘTRZE & KLIMAT</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mt-4">Galeria</h2>
          <p className="text-gray-500 mt-3">Odkryj atmosferę MAX PIZZA</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={i}
              onClick={() => setLightbox(img.src)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer ${i === 0 ? 'md:col-span-2 md:row-span-2 h-64 md:h-full' : (i === 1 || i === 2) ? 'h-48 md:h-full' : 'h-48 md:h-52'}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <ArrowRight size={20} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-6 right-6 text-white hover:text-cyan-400 transition-colors">
            <X size={32} />
          </button>
          <img
            src={lightbox}
            alt="Galeria"
            className="max-w-full max-h-[90vh] rounded-2xl object-contain"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

function Reviews() {
  return (
    <section id="opinie" className="py-28 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[600px] h-[600px] rounded-full bg-cyan-400/4 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="section-line-center">
            <span className="font-heading text-xs tracking-[0.3em] text-cyan-400">CO MÓWIĄ GOŚCIE</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mt-4">Opinie gości</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((r, i) => (
            <article
              key={i}
              className="testimonial-card glass border border-white/5 rounded-2xl p-6 transition-all duration-300 cursor-default"
            >
              <StarRating count={r.rating} />
              <p className="text-gray-400 text-sm leading-relaxed mt-4 mb-6 italic">"{r.text}"</p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400/30 to-cyan-600/30 flex items-center justify-center text-cyan-400 font-heading font-bold text-sm">
                  {r.name[0]}
                </div>
                <div>
                  <div className="text-white text-sm font-heading">{r.name}</div>
                  <div className="text-gray-600 text-xs">{r.date}</div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Average rating */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 glass border border-white/10 rounded-2xl px-8 py-4">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} className="star-filled fill-current" />
              ))}
            </div>
            <span className="font-heading text-2xl font-bold text-white">4.8</span>
            <span className="text-gray-400 text-sm">na podstawie 4 opinii</span>
            <span className="text-gray-500 text-sm">średnia ocen</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ParallaxCTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url('/images/restaurant/Zrzut_ekranu_2026-07-16_213128.png')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/90" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="section-line-center">
          <span className="font-heading text-xs tracking-[0.3em] text-cyan-400">ZAREZERWUJ STOLIK</span>
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
          Zaplanuj wizytę<br />w MAX PIZZA
        </h2>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          Zadzwoń do nas i zarezerwuj stolik lub zamów z dostawą. Jesteśmy do Twojej dyspozycji.
        </p>
        <a
          href="tel:175832030"
          className="inline-flex items-center gap-4 bg-gradient-to-r from-cyan-400 to-cyan-500 text-black font-heading font-bold text-3xl sm:text-4xl tracking-wider px-10 sm:px-16 py-6 sm:py-8 rounded-2xl phone-pulse hover:scale-105 transition-transform duration-300 shadow-2xl"
        >
          <Phone size={32} />
          17 583 20 30
        </a>
        <p className="text-gray-500 text-sm mt-4 font-heading tracking-wider">DOSTAWA I ODBIÓR OSOBISTY</p>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="kontakt" className="py-28 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="section-line-center">
            <span className="font-heading text-xs tracking-[0.3em] text-cyan-400">ZNAJDŹ NAS</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mt-4">Kontakt & Godziny</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Phone — largest, most prominent */}
          <div className="lg:col-span-3">
            <div className="glass-dark rounded-2xl p-8 sm:p-10 text-center teal-glow">
              <Phone size={32} className="text-cyan-400 mx-auto mb-4" />
              <p className="font-heading text-xs tracking-[0.3em] text-gray-500 mb-3">TELEFON</p>
              <a
                href="tel:175832030"
                className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl gradient-text teal-glow-text hover:scale-105 transition-transform inline-block"
              >
                17 583 20 30
              </a>
              <p className="text-gray-500 text-sm mt-3">Zadzwoń i zamów lub zarezerwuj stolik</p>
            </div>
          </div>

          {/* Address */}
          <div className="glass border border-white/5 rounded-2xl p-8 hover-lift">
            <MapPin size={24} className="text-cyan-400 mb-4" />
            <h3 className="font-heading text-sm tracking-widest text-gray-500 mb-3">ADRES</h3>
            <p className="text-white font-heading text-xl leading-relaxed">
              Aleja Ducha Świętego 12a<br />
              39-300 Mielec
            </p>
            <a
              href="https://www.google.com/maps/search/MAX+PIZZA+Drink+Bar%2C+aleja+Ducha+%C5%9Awi%C4%99tego+12%2C+39-300+Mielec"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cyan-400 text-sm font-heading tracking-wider mt-4 hover:text-cyan-300 transition-colors"
            >
              Otwórz w Mapach <ArrowRight size={14} />
            </a>
          </div>

          {/* Hours */}
          <div className="glass border border-white/5 rounded-2xl p-8 hover-lift">
            <Clock size={24} className="text-cyan-400 mb-4" />
            <h3 className="font-heading text-sm tracking-widest text-gray-500 mb-3">GODZINY OTWARCIA</h3>
            <div className="space-y-3">
              {HOURS.map((h, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">{h.days}</span>
                  <span className="font-heading text-cyan-400 font-semibold text-sm">{h.time}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/5">
              <p className="text-gray-600 text-xs font-heading tracking-wider">ŚNIADANIA: Sob–Nd 11:00–13:00</p>
            </div>
          </div>

          {/* Info */}
          <div className="glass border border-white/5 rounded-2xl p-8 hover-lift">
            <Calendar size={24} className="text-cyan-400 mb-4" />
            <h3 className="font-heading text-sm tracking-widest text-gray-500 mb-3">INFORMACJE</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Leaf size={14} className="text-green-400 flex-shrink-0" />
                <span>Opcje wegetariańskie dostępne</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame size={14} className="text-red-400 flex-shrink-0" />
                <span>Dania pikantne na życzenie</span>
              </div>
              <div className="flex items-center gap-2">
                <Pizza size={14} className="text-cyan-400 flex-shrink-0" />
                <span>Pizza własna — 5 składników</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart size={14} className="text-amber-400 flex-shrink-0" />
                <span>Działamy od 1999 roku</span>
              </div>
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="rounded-2xl overflow-hidden h-72 relative border border-white/5">
          <div className="absolute inset-0 bg-[#111] flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
              <MapPin size={28} className="text-cyan-400" />
            </div>
            <div className="text-center">
              <p className="font-heading text-white text-lg">MAX PIZZA & Drink Bar</p>
              <p className="text-gray-500 text-sm mt-1">Aleja Ducha Świętego 12a, 39-300 Mielec</p>
            </div>
            <a
              href="https://www.google.com/maps/search/MAX+PIZZA+Drink+Bar%2C+aleja+Ducha+%C5%9Awi%C4%99tego+12%2C+39-300+Mielec"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-cyan-400 text-black font-heading font-semibold text-sm tracking-wider px-6 py-3 rounded-full hover:bg-cyan-300 transition-colors relative z-10"
            >
              <MapPin size={14} />
              Otwórz w Google Maps
            </a>
          </div>
          {/* Decorative grid */}
          <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00c4cc" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
                <Pizza size={18} className="text-black" />
              </div>
              <div>
                <span className="font-heading text-xl tracking-widest text-white">MAX</span>
                <span className="font-heading text-xl tracking-widest gradient-text ml-1">PIZZA</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Pizza & Drink Bar w Mielcu. Tradycja smaku od 1999 roku.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading text-xs tracking-[0.2em] text-gray-500 mb-5">NAWIGACJA</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map(l => (
                <li key={l.href}>
                  <a href={l.href} className="text-gray-400 text-sm hover:text-cyan-400 transition-colors font-heading tracking-wide">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-heading text-xs tracking-[0.2em] text-gray-500 mb-5">GODZINY</h4>
            <div className="space-y-3">
              {HOURS.map((h, i) => (
                <div key={i}>
                  <div className="text-gray-500 text-xs">{h.days}</div>
                  <div className="text-cyan-400 font-heading text-sm mt-0.5">{h.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-xs tracking-[0.2em] text-gray-500 mb-5">KONTAKT</h4>
            <div className="space-y-4">
              <div>
                <div className="text-gray-500 text-xs mb-1">Telefon</div>
                <a href="tel:175832030" className="gradient-text font-heading font-bold text-xl hover:opacity-80 transition-opacity">
                  17 583 20 30
                </a>
              </div>
              <div>
                <div className="text-gray-500 text-xs mb-1">Adres</div>
                <p className="text-gray-400 text-sm">Al. Ducha Świętego 12a<br />39-300 Mielec</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-700 text-xs font-heading tracking-wider">
            © {new Date().getFullYear()} MAX PIZZA & DRINK BAR. WSZELKIE PRAWA ZASTRZEŻONE.
          </p>
          <p className="text-gray-700 text-xs">
            Mielec, Polska · Działamy od 1999 roku
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Featured />
        <MenuSection />
        <Gallery />
        <Reviews />
        <ParallaxCTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
