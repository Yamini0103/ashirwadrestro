export type MenuItem = { name: string; price: string; note?: string };
export type MenuCategory = { id: string; title: string; items: MenuItem[] };

// Edit freely: "Name ₹price (note); ..." per category.
const raw: [string, string][] = [
  ["Salad", "Spe. Green Salad ₹50 / ₹35 (Full / Half); Fruit Salad ₹120; Tomato Salad ₹30 (Half); Onion Salad ₹25; Kachumber Salad ₹40; Green Chilli Fry ₹30; Peanut Chaat ₹140"],
  ["Soup", "Tomato Soup ₹90; Hot & Sour Soup ₹80; Manchow Soup ₹80; Sweet Veg Corn ₹90"],
  ["Breakfast", "Paneer Paratha ₹50 (1pc); Paneer Paratha+Curd+Pickle ₹70; Mix Paratha ₹40; Mix Paratha+Pickle+Curd ₹60; Sev Paratha ₹40; Sev Paratha+Curd+Pickle ₹60; Methi Paratha ₹40; Methi Paratha+Curd+Pickle ₹60; Muli Paratha ₹35; Gobi Paratha ₹35; Aloo Paratha ₹35; Chola Batura ₹140"],
  ["Snacks", "Paneer Pakoda ₹150; Veg Pakoda ₹140; Hara Bhara Kabab ₹140; Veg Lollipop ₹140; Veg Cutlet ₹140; Chilli Paneer Dry ₹180; Veg Manchurian ₹140; Bhindi Kurkuri ₹140; Veg Noodles ₹140; Veg Hakka Noodles ₹130; French Fries ₹140; Singapuri Noodles ₹140; Schezwan Noodles ₹140; Mushroom Chilli ₹160; Honey Chilli Potato ₹160; Veg Kothey ₹150; American Chop Suey ₹140; Paneer 65 Dry ₹180; Crispy Corn ₹140"],
  ["Sweet Dish", "Mawa Bati ₹60 (2pcs); Gulab Jamun ₹45 (2pcs); Fruit Custard ₹90; Shrikhand ₹45 (Seasonal); Rasgulla ₹60 (2pcs); Gajar Ka Halwa ₹80 (Seasonal)"],
  ["Tandoor Se", "Hariyali Tikka ₹170; Veg Seekh Kabab ₹170; Veg Malai Seekh Kabab ₹180; Cheese Chilli Onion Kabab ₹180; Paneer Tikka Dry ₹180; Veg Malai Tikka ₹180; Ajwaini Tikka ₹170; Pudina Tikka ₹170; Paneer Peshawari Tikka ₹180; Mushroom Tikka ₹180"],
  ["Special Paneer", "Paneer Rangila ₹180; Paneer Amritsari ₹180; Paneer Maharaja ₹170; Paneer Chulbule ₹180; Paneer Golmal ₹180; Paneer Anguri ₹180; Paneer Hyderabadi ₹180; Paneer Achari ₹170; Paneer Lahori ₹180; Paneer Laccha ₹180; Paneer Pista ₹180; Paneer Pasanda ₹180; Paneer Malwa ₹170; Paneer Lawabdar ₹180; Paneer Takatak ₹180; Paneer Dildar ₹180; Mushroom Paneer ₹180; Paneer Kholapuri ₹170; Cheese Paneer Masala ₹180"],
  ["Special Green Veg", "Veg Patiala ₹180; Veg Makhanwala ₹180; Veg Kolhapuri ₹170; Veg Jalfrezi ₹180; Veg Jaipuri ₹170; Veg Bauli Handi ₹170; Navratan Korma ₹170; Spe. Shahi Methi ₹190; Shahi Palak ₹180; Methi Mutter Malai ₹180; Mushroom Palak ₹180; Mushroom Mutter ₹170; Mutter Paneer ₹150; Chola Paneer ₹150; Tomato Paneer ₹150; Spe. Sev Methi Paneer ₹170; Sev Paneer ₹160; Palak Paneer ₹150; Aloo Paneer ₹150; Bharta Mix Paneer ₹160; Gobhi Manchurian ₹170; Aloo Gobhi 65 ₹170; Aloo 65 ₹160; Mushroom Masala ₹180; Spe. Green Chana Masala ₹160; Spe. Green Peas Masala ₹160; Paneer Patiala ₹200"],
  ["Kabul Ka Khazana", "Kaju Curry ₹190; Kaju Singapuri ₹200; Kaju Paneer ₹210; Kaju Mutter ₹190; Kaju Milan ₹210; Kaju Paneer Makhana ₹220; Spl. Kaju Kofta ₹190; Kaju Mushroom ₹220"],
  ["Paneer Ki Bahar", "Sabnam Curry ₹180; Paneer Angara ₹180; Paneer Masala ₹170; Paneer Korma ₹180; Paneer Punjabi ₹170; Paneer Namkeen ₹170; Butter Paneer Masala ₹180; Paneer Pudina ₹180; Paneer Mastana ₹190; Paneer Tikka Masala ₹190; Paneer Handi ₹170; Paneer Peshawari ₹180; Paneer Tiranga ₹180; Shahi Paneer (Spe.) ₹170; Paneer Pappu ₹170; Kadhai Paneer ₹170; Paneer Bhurji ₹200; Paneer Chatpata ₹170; Paneer Pachisa ₹170"],
  ["Kheton Ki Hariyali", "Special Mix Vegetable ₹150; Stuffed Capsicum ₹150; Sev Mawa ₹160; Sev Tomato ₹140; Sev Mutter ₹150; Tomato Chutney ₹150; Bhindi Masala ₹140; Bhindi Do Pyaza ₹150; Bhindi Aloo ₹150; Aloo Masala ₹140; Aloo Gobhi ₹140; Aloo Do Pyaza ₹145; Aloo Jeera Fry ₹140; Aloo Matar ₹140; Aloo Chola ₹140; Aloo Palak ₹140; Aloo Methi Dry ₹150; Chola Masala ₹150; Baingan Bharta ₹150"],
  ["Special Kofta", "Butter Malai Kofta ₹170; Spl. Shahi Kofta ₹180; Vegetable Kofta ₹160; Punjabi Kofta ₹160; Hariyali Kofta ₹160; Nargis Kofta ₹180; Masala Kofta ₹160; Spl. Dum Aloo ₹170; Stuffed Tomato ₹170"],
  ["Crunchy Items", "Papad Fry Masala ₹30; Papad Dry Masala ₹30; Papad Dry ₹25; Papad Fry ₹25; Chana Papad Dry ₹30"],
  ["Raita & Drinks", "Fruit Raita ₹120; Mix Veg Raita ₹100; Pineapple Raita ₹110; Boondi Raita ₹100; Kachumber Raita ₹90; Fried Masala Curd ₹120; Plain Curd ₹50 / ₹30 (Full / Half); Butter Milk ₹25; Sweet Lassi ₹50"],
];

export const menu: MenuCategory[] = raw.map(([title, s]) => ({
  id: title.toLowerCase().replace(/[^a-z]+/g, "-"),
  title,
  items: s.split(";").map((p) => {
    const m = p.trim().match(/^(.*?)\s(₹.*?)(?:\s\((.*)\))?$/)!;
    return m[3] ? { name: m[1]!, price: m[2]!, note: m[3] } : { name: m[1]!, price: m[2]! };
  }),
}));
