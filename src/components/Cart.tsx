import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { Image } from '@/components/ui/image';

export default function Cart() {
  const { items, totalPrice, isOpen, isCheckingOut, actions } = useCart();
  const { currency } = useCurrency();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={actions.closeCart}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background border-l border-primary/20 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-primary/10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-heading text-xl font-bold text-foreground">
                    Your Cart
                  </h2>
                  <p className="font-paragraph text-sm text-foreground/60">
                    {items.length} {items.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>
              <button
                onClick={actions.closeCart}
                className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="p-6 rounded-full bg-primary/5 mb-4">
                    <ShoppingBag className="w-12 h-12 text-primary/30" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                    Your cart is empty
                  </h3>
                  <p className="font-paragraph text-sm text-foreground/60 mb-6">
                    Add some official FIFA World Cup merchandise to get started
                  </p>
                  <button
                    onClick={actions.closeCart}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-paragraph font-semibold transition-all hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-4 p-4 rounded-xl bg-gradient-to-br from-background to-background/50 border border-primary/10"
                    >
                      {/* Item Image */}
                      {item.image && (
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-background/50 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading text-sm font-bold text-foreground mb-1 truncate">
                          {item.name}
                        </h3>
                        <p className="font-paragraph text-lg font-bold text-primary mb-3">
                          {formatPrice(item.price, currency ?? DEFAULT_CURRENCY)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 bg-background/50 rounded-lg p-1">
                            <button
                              onClick={() => actions.updateQuantity(item, Math.max(1, item.quantity - 1))}
                              className="p-1 rounded hover:bg-primary/10 transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4 text-foreground" />
                            </button>
                            <span className="font-paragraph text-sm font-medium text-foreground w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => actions.updateQuantity(item, item.quantity + 1)}
                              className="p-1 rounded hover:bg-primary/10 transition-colors"
                            >
                              <Plus className="w-4 h-4 text-foreground" />
                            </button>
                          </div>

                          <button
                            onClick={() => actions.removeFromCart(item)}
                            className="p-2 rounded-lg hover:bg-destructive/10 transition-colors ml-auto"
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-primary/10 space-y-4">
                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="font-paragraph text-lg text-foreground/60">
                    Total
                  </span>
                  <span className="font-heading text-2xl font-bold text-primary">
                    {formatPrice(totalPrice, currency ?? DEFAULT_CURRENCY)}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={actions.checkout}
                  disabled={isCheckingOut}
                  className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-paragraph font-semibold text-lg transition-all hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
                </button>

                {/* Continue Shopping */}
                <button
                  onClick={actions.closeCart}
                  className="w-full py-3 bg-transparent border border-primary/20 text-foreground rounded-lg font-paragraph font-medium transition-all hover:border-primary/40"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
