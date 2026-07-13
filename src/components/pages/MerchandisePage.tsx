import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Search, Filter } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService, useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { MerchandiseOffers } from '@/entities';
import { Image } from '@/components/ui/image';

export default function MerchandisePage() {
  const [items, setItems] = useState<MerchandiseOffers[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAvailable, setFilterAvailable] = useState<string>('all');
  const { addingItemId, actions } = useCart();
  const { currency } = useCurrency();

  useEffect(() => {
    loadMerchandise();
  }, []);

  const loadMerchandise = async () => {
    try {
      const result = await BaseCrudService.getAll<MerchandiseOffers>('merchandiseoffers', {}, { limit: 50 });
      setItems(result.items);
    } catch (error) {
      console.error('Failed to load merchandise:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.itemName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterAvailable === 'all' || 
                         (filterAvailable === 'available' && item.isAvailable) ||
                         (filterAvailable === 'unavailable' && !item.isAvailable);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="relative w-full overflow-hidden bg-gradient-to-br from-secondary/10 via-background to-primary/10">
        <div className="max-w-[120rem] mx-auto px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-5xl lg:text-7xl font-bold text-foreground mb-6">
              Official Merchandise
            </h1>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl">
              Exclusive FIFA World Cup 2026 collectibles, apparel, and memorabilia
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-[120rem] mx-auto px-8 py-16">
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
            <input
              type="text"
              placeholder="Search merchandise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-background border border-primary/20 rounded-xl font-paragraph text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/40"
            />
          </div>

          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-primary" />
            <select
              value={filterAvailable}
              onChange={(e) => setFilterAvailable(e.target.value)}
              className="px-6 py-4 bg-background border border-primary/20 rounded-xl font-paragraph text-foreground focus:outline-none focus:border-primary/40"
            >
              <option value="all">All Items</option>
              <option value="available">Available</option>
              <option value="unavailable">Sold Out</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[600px]">
          {isLoading ? null : filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group rounded-2xl bg-gradient-to-br from-background to-background/50 border border-primary/10 hover:border-primary/30 transition-all duration-300 overflow-hidden"
              >
                <Link to={`/merchandise/${item._id}`}>
                  {item.itemImage && (
                    <div className="aspect-square overflow-hidden bg-background/50">
                      <Image
                        src={item.itemImage}
                        alt={item.itemName || 'Merchandise'}
                        width={400}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                </Link>

                <div className="p-6">
                  <Link to={`/merchandise/${item._id}`}>
                    <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-3">
                      {item.itemName}
                    </h3>
                  </Link>

                  {item.itemDescription && (
                    <p className="font-paragraph text-sm text-foreground/60 mb-4 line-clamp-2">
                      {item.itemDescription}
                    </p>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <span className="font-heading text-2xl font-bold text-primary">
                      {formatPrice(item.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
                    </span>
                    <span className={`text-xs font-paragraph px-3 py-1 rounded-full ${
                      item.isAvailable 
                        ? 'bg-secondary/10 text-secondary' 
                        : 'bg-destructive/10 text-destructive'
                    }`}>
                      {item.isAvailable ? 'Available' : 'Sold Out'}
                    </span>
                  </div>

                  {item.isAvailable && (
                    <button
                      onClick={() => actions.addToCart({ 
                        collectionId: 'merchandiseoffers', 
                        itemId: item._id 
                      })}
                      disabled={addingItemId === item._id}
                      className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-paragraph font-semibold transition-all hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] disabled:opacity-50"
                    >
                      {addingItemId === item._id ? 'Adding...' : 'Add to Cart'}
                    </button>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center py-24">
              <ShoppingBag className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
              <p className="font-paragraph text-foreground/40">
                {searchQuery || filterAvailable !== 'all' ? 'No items match your filters' : 'No merchandise available'}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
