import React, { useState, useMemo } from "react";

/**
 * AASHRA LAUNDRY — Zomato-like single-file app
 * - Tailwind CSS required
 * - WhatsApp ordering uses +91 95314 68479 with prefilled message
 *
 * Replace image URLs (placeholder) by placing files in /public/images/
 */

const WHATSAPP_NUMBER = "919531468479";

const providers = [
  {
    id: "p1",
    name: "Spark Cleaners",
    tagline: "Fast 24h service • Eco detergents",
    rating: 4.7,
    eta: "24 hrs",
    priceLabel: "₹99/kg",
    pickupFreeAbove: 499,
    badges: ["Wash & Fold", "Pickup", "Dry Clean"],
    image: "/public/images/provider1.jpg",
    menu: [
      { id: "m1", title: "Wash & Fold (per kg)", price: 99 },
      { id: "m2", title: "Express Wash (per kg)", price: 149 },
      { id: "m3", title: "Dry Clean (per item)", price: 199 },
    ],
  },
  {
    id: "p2",
    name: "FreshThreads",
    tagline: "Family packs & business plans",
    rating: 4.6,
    eta: "48 hrs",
    priceLabel: "₹109/kg",
    pickupFreeAbove: 599,
    badges: ["Family Pack", "Monthly Plans"],
    image: "/public/images/provider2.jpg",
    menu: [
      { id: "m1", title: "Wash & Fold (per kg)", price: 109 },
      { id: "m2", title: "Family Pack - 80 clothes", price: 999 },
      { id: "m3", title: "Stain Treatment", price: 59 },
    ],
  },
  {
    id: "p3",
    name: "Urban Laundry Co.",
    tagline: "Hotel & homestay solutions (B2B)",
    rating: 4.5,
    eta: "Contact",
    priceLabel: "Custom rates",
    pickupFreeAbove: 0,
    badges: ["B2B", "Hotel Service"],
    image: "/public/images/provider3.jpg",
    menu: [
      { id: "m1", title: "Hotel Contract Plan", price: 0 },
      { id: "m2", title: "Bulk - per kg", price: 85 },
    ],
  },
];

function formatCurrency(n) {
  return `₹${n}`;
}

function ProviderCard({ p, onAdd }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
      <div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={p.image || "https://via.placeholder.com/600x300?text=Laundry"}
          alt={p.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">{p.name}</h3>
            <p className="text-sm text-gray-500">{p.tagline}</p>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold">{p.rating} ⭐</div>
            <div className="text-xs text-gray-500">{p.eta}</div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <div className="text-sm font-bold">{p.priceLabel}</div>
          {p.badges.map((b) => (
            <span
              key={b}
              className="text-xs px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full"
            >
              {b}
            </span>
          ))}
        </div>

        <div className="mt-4 space-y-2">
          {p.menu.map((m) => (
            <div
              key={m.id}
              className="flex items-center justify-between gap-4"
            >
              <div>
                <div className="font-medium">{m.title}</div>
                <div className="text-sm text-gray-500">
                  {m.price > 0 ? formatCurrency(m.price) : "Contact for pricing"}
                </div>
              </div>
              <button
                onClick={() => onAdd(p, m)}
                className="ml-4 px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:opacity-95"
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CartDrawer({ open, onClose, items, onRemove, onClear, onOrder }) {
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  return (
    <div
      className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white z-50 transform ${
        open ? "translate-x-0" : "translate-x-full"
      } transition-transform shadow-lg`}
    >
      <div className="p-4 border-b flex items-center justify-between">
        <h4 className="font-bold">Your Order</h4>
        <button onClick={onClose} className="text-gray-500">Close</button>
      </div>

      <div className="p-4 flex-1 overflow-auto">
        {items.length === 0 ? (
          <div className="text-gray-500 text-sm">Your cart is empty.</div>
        ) : (
          <div className="space-y-4">
            {items.map((it, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{it.title}</div>
                  <div className="text-sm text-gray-500">{it.provider}</div>
                  <div className="text-sm text-gray-500">
                    {formatCurrency(it.price)} x {it.qty}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="text-sm font-semibold">
                    {formatCurrency(it.price * it.qty)}
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => onRemove(it, -1)} className="px-2 py-1 border rounded">-</button>
                    <div className="px-2 py-1 border rounded">{it.qty}</div>
                    <button onClick={() => onRemove(it, 1)} className="px-2 py-1 border rounded">+</button>
                  </div>
                </div>
              </div>
            ))}
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <div className="text-gray-600">Subtotal</div>
                <div className="font-bold">{formatCurrency(subtotal)}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <button onClick={onClear} className="flex-1 py-3 border rounded-md text-sm">Clear</button>
          <button
            onClick={() => onOrder(items, subtotal)}
            className="flex-1 py-3 bg-green-600 text-white rounded-md text-sm"
            disabled={items.length === 0}
          >
            Order via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [areaFilter, setAreaFilter] = useState("");

  const tabs = ["All", "Pickup", "Express", "Family", "Hotel"];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return providers.filter((p) => {
      if (activeTab !== "All") {
        if (!p.badges.join(" ").toLowerCase().includes(activeTab.toLowerCase())) return false;
      }
      if (areaFilter) {
        // area filtering placeholder
      }
      if (!q) return true;
      return (p.name + " " + p.tagline + " " + p.badges.join(" ")).toLowerCase().includes(q);
    });
  }, [query, activeTab, areaFilter]);

  function addToCart(provider, menuItem) {
    setCart((prev) => {
      const exists = prev.find((x) => x.providerId === provider.id && x.menuId === menuItem.id);
      if (exists) {
        return prev.map((x) =>
          x.providerId === provider.id && x.menuId === menuItem.id ? { ...x, qty: x.qty + 1 } : x
        );
      } else {
        return [
          ...prev,
          {
            providerId: provider.id,
            provider: provider.name,
            menuId: menuItem.id,
            title: menuItem.title,
            price: menuItem.price || 0,
            qty: 1,
          },
        ];
      }
    });
    setCartOpen(true);
  }

  function changeQty(item, delta) {
    setCart((prev) => {
      const next = prev
        .map((p) => (p === item ? { ...p, qty: Math.max(0, p.qty + delta) } : p))
        .filter((p) => p.qty > 0);
      return next;
    });
  }

  function clearCart() {
    setCart([]);
  }

  function orderViaWhatsApp(items, subtotal) {
    if (!items || items.length === 0) return;
    const provider = items[0].provider;
    const lines = [];
    lines.push("New Inquiry from Website:");
    lines.push(`*Provider:* ${provider}`);
    lines.push(`*Items:*`);
    items.forEach((it) => {
      lines.push(`- ${it.title} x ${it.qty} (${formatCurrency(it.price * it.qty)})`);
    });
    lines.push(`*Subtotal:* ${formatCurrency(subtotal)}`);
    lines.push("");
    lines.push("*Name:*");
    lines.push("*Phone:*");
    lines.push("*Email:*");
    lines.push("*Address:*");
    lines.push("*Notes:*");
    const text = encodeURIComponent(lines.join("\n"));
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, "_blank");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 bg-white z-40 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
            <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-gradient-to-br from-indigo-600 to-emerald-400 text-white flex items-center justify-center font-bold">AL</div>
            <div>
              <div className="font-bold text-lg">AASHRA LAUNDRY</div>
              <div className="text-xs text-gray-500">Clean clothes, fast delivery</div>
            </div>
          </div>

          <div className="flex-1 px-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services, packages, shops..."
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setCartOpen(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-md">
              Cart ({cart.reduce((s, i) => s + i.qty, 0)})
            </button>
            <a
              className="px-3 py-2 text-sm border rounded-md hidden md:inline-block"
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("New Inquiry from Website:\n*Name:*\n*Email:*\n*Message:*")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 py-2">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`whitespace-nowrap px-3 py-2 rounded-full ${activeTab === t ? "bg-indigo-600 text-white" : "bg-white border"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProviderCard key={p.id} p={p} onAdd={addToCart} />
          ))}
        </section>

        {/* Info / How it works */}
        <section className="mt-10 bg-white rounded-2xl p-6 shadow">
          <h4 className="font-bold text-lg">How AASHRA LAUNDRY works</h4>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl mb-2">1</div>
              <div className="font-semibold">Choose provider & service</div>
              <div className="text-sm text-gray-500 mt-1">Add items to cart</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">2</div>
              <div className="font-semibold">Send order on WhatsApp</div>
              <div className="text-sm text-gray-500 mt-1">Pre-filled message for quick booking</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">3</div>
              <div className="font-semibold">Pickup & delivery</div>
              <div className="text-sm text-gray-500 mt-1">Track and relax</div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating quick-order */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("New Inquiry from Website:\n*Name:*\n*Email:*\n*Message:*")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-5 bottom-5 bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg z-40"
        aria-label="WhatsApp"
      >
        💬
      </a>

      {/* Cart Drawer */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onRemove={(it, delta) => changeQty(it, delta)}
        onClear={() => clearCart()}
        onOrder={(items, subtotal) => orderViaWhatsApp(items, subtotal)}
      />
    </div>
  );
}
