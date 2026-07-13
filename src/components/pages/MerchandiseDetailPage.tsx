import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowLeft, Check, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { BaseCrudService, useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { MerchandiseOffers } from '@/entities';
import { Image } from '@/components/ui/image';

export default function MerchandiseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<MerchandiseOffers | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addingItemId, actions } = useCart();
  const { currency } = useCurrency();

  useEffect(() => {
    loadItem();
  }, [id]);

  const loadItem = async () => {
    if (!id) return;
    try {
      const data = await BaseCrudService.getById<MerchandiseOffers>('merchandiseoffers', id);
      setItem(data);
    } catch (error) {
      console.error('Failed to load item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="max-w-[120rem] mx-auto px-8 py-16 min-h-[600px]">
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <LoadingSpinner />
          </div>
        ) : !item ? (
          <div className="text-center py-24">
            <ShoppingBag className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Item Not Found</h2>
            <Link to="/merchandise" className="text-primary hover:underline font-paragraph">
              Back to Merchandise
            </Link>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/merchandise" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-paragraph mb-8">
              <ArrowLeft className="w-4 h-4" />
              Back to Merchandise
            </Link>

            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                {item.itemImage && (
                  <div className="aspect-square rounded-2xl overflow-hidden bg-background/50 border border-primary/10">
                    <Image
                      src={item.itemImage}
                      alt={item.itemName || 'Merchandise'}
                      width={800}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div>
                <div className="mb-6">
                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-paragraph font-medium mb-4 ${
                    item.isAvailable 
                      ? 'bg-secondary/10 text-secondary' 
                      : 'bg-destructive/10 text-destructive'
                  }`}>
                    {item.isAvailable ? 'Available' : 'Sold Out'}
                  </span>
                  
                  <h1 className="font-heading text-4xl lg:text-6xl font-bold text-foreground mb-6">
                    {item.itemName}
                  </h1>

                  <div className="font-heading text-5xl font-bold text-primary mb-8">
                    {formatPrice(item.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
                  </div>
                </div>

                {item.itemDescription && (
                  <div className="mb-8">
                    <h2 className="font-heading text-xl font-bold text-foreground mb-3">Description</h2>
                    <p className="font-paragraph text-lg text-foreground/70 leading-relaxed">
                      {item.itemDescription}
                    </p>
                  </div>
                )}

                <div className="mb-8 p-6 rounded-xl bg-gradient-to-br from-background to-background/50 border border-primary/10">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-4">Product Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      {item.isAvailable ? (
                        <Check className="w-5 h-5 text-secondary" />
                      ) : (
                        <X className="w-5 h-5 text-destructive" />
                      )}
                      <span className="font-paragraph text-foreground/70">
                        {item.isAvailable ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-secondary" />
                      <span className="font-paragraph text-foreground/70">Official FIFA World Cup 2026 Merchandise</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-secondary" />
                      <span className="font-paragraph text-foreground/70">Authentic & Licensed Product</span>
                    </div>
                  </div>
                </div>

                {item.isAvailable && (
                  <button
                    onClick={() => actions.addToCart({ 
                      collectionId: 'merchandiseoffers', 
                      itemId: item._id 
                    })}
                    disabled={addingItemId === item._id}
                    className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-primary text-primary-foreground rounded-xl font-paragraph font-semibold text-lg transition-all hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] disabled:opacity-50"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    {addingItemId === item._id ? 'Adding to Cart...' : 'Add to Cart'}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </section>

      <Footer />
    </div>
  );
}
