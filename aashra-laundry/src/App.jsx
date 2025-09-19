import React from \"react\";
import { motion } from \"framer-motion\";
import { Button } from \"@/components/ui/button\";

export default function LaundryPro() {
  return (
    <div className=\"min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50 text-gray-800\">
      {/* Header */}
      <header className=\"w-full py-6 shadow bg-white sticky top-0 z-50\">
        <div className=\"max-w-7xl mx-auto px-6 flex justify-between items-center\">
          <h1 className=\"text-2xl font-extrabold text-blue-700\">AASHRA LAUNDRY</h1>
          <nav className=\"space-x-6 hidden md:flex\">
            <a href=\"#services\" className=\"hover:text-blue-600\">Services</a>
            <a href=\"#about\" className=\"hover:text-blue-600\">About</a>
            <a href=\"#contact\" className=\"hover:text-blue-600\">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className=\"flex-1 flex flex-col justify-center items-center text-center py-20 px-6\">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className=\"text-4xl md:text-6xl font-bold text-blue-800\"
        >
          Clean Clothes, Hassle Free.
        </motion.h2>
        <p className=\"mt-6 text-lg md:text-xl text-gray-600 max-w-2xl\">
          Reliable laundry service for students, families, and businesses. Book your plan today!
        </p>
        <Button asChild className=\"mt-8 px-6 py-3 text-lg rounded-full shadow-lg\">
          <a
            href={`https://wa.me/919531468479?text=${encodeURIComponent(
              \`New Inquiry from Website:\n*Name:*\n*Email:*\n*Message:*\`
            )}`}
            target=\"_blank\"
            rel=\"noopener noreferrer\"
          >
            Book on WhatsApp
          </a>
        </Button>
      </section>

      {/* Services */}
      <section id=\"services\" className=\"py-16 bg-gray-50\">
        <h2 className=\"text-center text-3xl font-extrabold text-gray-800\">Our Services</h2>
        <div className=\"mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-6\">
          {/* Students */}
          <div className=\"bg-white rounded-2xl shadow hover:shadow-lg transition p-6 text-center\">
            <h3 className=\"font-bold text-lg\">Students & Bachelor</h3>
            <p className=\"text-gray-500 mt-2\">Starting at ₹499/month for 40 clothes</p>
            <Button asChild className=\"mt-4 w-full\">
              <a
                href={`https://wa.me/919531468479?text=${encodeURIComponent(
                  \`New Inquiry from Website:\n*Service:* Students & Bachelor Plan\n*Name:*\n*Email:*\n*Message:*\`
                )}`}
                target=\"_blank\"
                rel=\"noopener noreferrer\"
              >
                Choose Plan
              </a>
            </Button>
          </div>

          {/* Family */}
          <div className=\"bg-white rounded-2xl shadow hover:shadow-lg transition p-6 text-center border-2 border-blue-100\">
            <h3 className=\"font-bold text-lg\">Family Package</h3>
            <p className=\"text-gray-500 mt-2\">Starting at ₹999/month for 80 clothes (3 plans)</p>
            <Button asChild className=\"mt-4 w-full\">
              <a
                href={`https://wa.me/919531468479?text=${encodeURIComponent(
                  \`New Inquiry from Website:\n*Service:* Family Package\n*Name:*\n*Email:*\n*Message:*\`
                )}`}
                target=\"_blank\"
                rel=\"noopener noreferrer\"
              >
                Choose Plan
              </a>
            </Button>
          </div>

          {/* Hotel */}
          <div className=\"bg-white rounded-2xl shadow hover:shadow-lg transition p-6 text-center opacity-80\">
            <h3 className=\"font-bold text-lg\">Hotel & Homestay</h3>
            <p className=\"text-gray-500 mt-2\">Coming soon...</p>
            <Button asChild className=\"mt-4 w-full\" disabled>
              <a
                href={`https://wa.me/919531468479?text=${encodeURIComponent(
                  \`New Inquiry from Website:\n*Service:* Hotel & Homestay\n*Name:*\n*Email:*\n*Message:*\`
                )}`}
                target=\"_blank\"
                rel=\"noopener noreferrer\"
              >
                Coming Soon
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* About */}
      <section id=\"about\" className=\"py-16 max-w-4xl mx-auto px-6 text-center\">
        <h2 className=\"text-3xl font-extrabold text-gray-800\">Why Choose Us?</h2>
        <p className=\"mt-4 text-gray-600\">
          At AASHRA LAUNDRY, we make your life easier with affordable plans, doorstep pickup & delivery, and eco-friendly cleaning.
        </p>
      </section>

      {/* Contact */}
      <section id=\"contact\" className=\"py-16 bg-blue-50\">
        <h2 className=\"text-3xl font-extrabold text-center text-gray-800\">Contact Us</h2>
        <div className=\"mt-8 flex justify-center\">
          <Button asChild className=\"px-6 py-3 text-lg rounded-full shadow-lg\">
            <a
              href={`https://wa.me/919531468479?text=${encodeURIComponent(
                \`New Inquiry from Website:\n*Name:*\n*Email:*\n*Message:*\`
              )}`}
              target=\"_blank\"
              rel=\"noopener noreferrer\"
            >
              Chat on WhatsApp
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className=\"py-6 bg-white shadow-inner text-center text-gray-500\">
        © {new Date().getFullYear()} AASHRA LAUNDRY. All rights reserved.
      </footer>
    </div>
  );
}