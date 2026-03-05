import { Smartphone, Tablet, Watch, Headphones, Battery, Monitor, Tag, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categories = [
  { icon: Smartphone, label: "Smartphones", href: "/kollektion/alle" },
  { icon: Tablet, label: "Tablets", href: "/kollektion/alle" },
  { icon: Watch, label: "Smartwatches", href: "/kollektion/alle" },
  { icon: Headphones, label: "Kopfhörer", href: "/kollektion/alle" },
  { icon: Battery, label: "Ladegeräte", href: "/kollektion/alle" },
  { icon: Monitor, label: "Laptops", href: "/kollektion/alle" },
  { icon: Tag, label: "Angebote", href: "/kollektion/alle" },
  { icon: Wrench, label: "Ankauf", href: "/ankauf" },
];

const CategoryIcons = () => {
  return (
    <section className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-4 md:grid-cols-8 gap-4 md:gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={cat.href}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-category-bg flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-200">
                <cat.icon className="w-7 h-7 md:w-8 md:h-8 text-foreground group-hover:text-accent-foreground transition-colors" />
              </div>
              <span className="text-xs md:text-sm font-medium text-foreground text-center">
                {cat.label}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategoryIcons;
