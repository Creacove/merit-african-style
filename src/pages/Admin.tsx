import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders, useUpdateOrderStatus, useSetDeliveryDate } from '@/hooks/useOrders';
import { useAdminProducts, useUpdateProduct, useDeleteProduct } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ProductForm } from '@/components/admin/ProductForm';
import { OrderDetailsModal } from '@/components/admin/OrderDetailsModal';
import { Product, Order } from '@/types/database';
import { Package, ShoppingBag, Users, Loader2, LogOut, Eye, EyeOff, Plus, Pencil, Star, ChevronRight, X } from 'lucide-react';
import { format } from 'date-fns';

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAdmin, isLoading: authLoading, signOut } = useAuth();
  const { data: orders, isLoading: ordersLoading } = useOrders();
  const { data: products, isLoading: productsLoading } = useAdminProducts();
  const updateOrderStatus = useUpdateOrderStatus();
  const setDeliveryDate = useSetDeliveryDate();
  const updateProduct = useUpdateProduct();
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/auth');
    }
  }, [user, isAdmin, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[hsl(var(--deep-chocolate))] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[hsl(var(--gold-accent))]" />
      </div>
    );
  }

  if (!isAdmin) return null;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(price);

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-600',
    paid: 'bg-blue-600',
    measuring: 'bg-purple-600',
    production: 'bg-orange-600',
    shipped: 'bg-cyan-600',
    delivered: 'bg-green-600',
    cancelled: 'bg-red-600',
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--deep-chocolate))]">
      {/* Header */}
      <header className="bg-[hsl(var(--bg-section))] border-b border-[hsl(var(--gold-accent))]/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <img src="/logo.png" alt="Merit African Style" className="h-10" />
            </Link>
            <span className="text-[hsl(var(--gold-accent))] font-medium">Admin Dashboard</span>
          </div>
          <Button variant="ghost" onClick={signOut} className="text-[hsl(var(--warm-ivory))]">
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Orders', value: orders?.length || 0, icon: ShoppingBag },
            { label: 'Pending', value: orders?.filter((o) => o.status === 'pending').length || 0, icon: Package },
            { label: 'Bespoke Orders', value: orders?.filter((o) => o.order_type === 'bespoke').length || 0, icon: Users },
            { label: 'Products', value: products?.length || 0, icon: Package },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-[hsl(var(--bg-section))] rounded-2xl p-5 border border-[hsl(var(--gold-accent))]/10">
              <Icon className="w-6 h-6 text-[hsl(var(--gold-accent))] mb-2" />
              <p className="text-2xl font-bold text-[hsl(var(--warm-ivory))]">{value}</p>
              <p className="text-[hsl(var(--muted-foreground))] text-sm">{label}</p>
            </div>
          ))}
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="bg-[hsl(var(--bg-section))]">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <div className="bg-[hsl(var(--bg-section))] rounded-2xl border border-[hsl(var(--gold-accent))]/10 overflow-hidden">
              {ordersLoading ? (
                <div className="p-12 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-[hsl(var(--gold-accent))]" /></div>
              ) : orders?.length === 0 ? (
                <div className="p-12 text-center text-[hsl(var(--muted-foreground))]">No orders yet</div>
              ) : (
                <>
                  {/* Mobile View - Cards */}
                  <div className="md:hidden">
                    {orders?.map((order) => (
                      <div
                        key={order.id}
                        className="p-4 border-b border-[hsl(var(--gold-accent))]/10 hover:bg-[hsl(var(--deep-chocolate))]/30 cursor-pointer transition-colors"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="text-[hsl(var(--warm-ivory))] font-medium text-lg">{order.customer_name}</p>
                            <p className="text-[hsl(var(--muted-foreground))] text-sm">{order.customer_email}</p>
                          </div>
                          <div className="text-right">
                            <Badge className={statusColors[order.status] || 'bg-gray-600'}>{order.status}</Badge>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-[hsl(var(--muted-foreground))] text-sm">
                              {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                            </span>
                            <Badge className={order.order_type === 'bespoke' ? 'bg-purple-600' : 'bg-blue-600'}>
                              {order.order_type}
                            </Badge>
                          </div>
                          <span className="text-[hsl(var(--warm-ivory))] font-semibold">{formatPrice(order.total_amount)}</span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[hsl(var(--muted-foreground))]">
                            {format(new Date(order.created_at), 'MMM d, yyyy')}
                          </span>
                          <ChevronRight className="w-5 h-5 text-[hsl(var(--muted-foreground))]" />
                        </div>

                        {/* Mobile Controls */}
                        <div className="mt-4 pt-4 border-t border-[hsl(var(--gold-accent))]/10 space-y-3">
                          <div onClick={(e) => e.stopPropagation()}>
                            <label className="text-[hsl(var(--warm-ivory))] text-sm font-medium block mb-2">Status</label>
                            <Select
                              value={order.status || 'pending'}
                              onValueChange={(status) => updateOrderStatus.mutate({ id: order.id, status })}
                            >
                              <SelectTrigger className="w-full bg-[hsl(var(--deep-chocolate))] border-[hsl(var(--gold-accent))]/20">
                                <Badge className={statusColors[order.status || 'pending']}>{order.status}</Badge>
                              </SelectTrigger>
                              <SelectContent>
                                {['pending', 'paid', 'measuring', 'production', 'shipped', 'delivered', 'cancelled'].map((s) => (
                                  <SelectItem key={s} value={s}>{s}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div onClick={(e) => e.stopPropagation()}>
                            <label className="text-[hsl(var(--warm-ivory))] text-sm font-medium block mb-2">Delivery Date</label>
                            <Input
                              type="date"
                              value={order.delivery_date || ''}
                              onChange={(e) => setDeliveryDate.mutate({ id: order.id, delivery_date: e.target.value })}
                              className="w-full bg-[hsl(var(--deep-chocolate))] border-[hsl(var(--gold-accent))]/20 text-[hsl(var(--warm-ivory))]"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop View - Table */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[hsl(var(--deep-chocolate))]">
                        <tr>
                          {['Customer', 'Items', 'Type', 'Total', 'Status', 'Delivery', 'Date', ''].map((h) => (
                            <th key={h} className="px-4 py-3 text-left text-[hsl(var(--muted-foreground))] text-sm font-medium">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[hsl(var(--gold-accent))]/10">
                        {orders?.map((order) => (
                          <tr
                            key={order.id}
                            className="hover:bg-[hsl(var(--deep-chocolate))]/50 cursor-pointer transition-colors"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <td className="px-4 py-4">
                              <p className="text-[hsl(var(--warm-ivory))] font-medium">{order.customer_name}</p>
                              <p className="text-[hsl(var(--muted-foreground))] text-sm">{order.customer_email}</p>
                            </td>
                            <td className="px-4 py-4 text-[hsl(var(--muted-foreground))] text-sm">
                              {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                            </td>
                            <td className="px-4 py-4">
                              <Badge className={order.order_type === 'bespoke' ? 'bg-purple-600' : 'bg-blue-600'}>
                                {order.order_type}
                              </Badge>
                            </td>
                            <td className="px-4 py-4 text-[hsl(var(--warm-ivory))] font-medium">{formatPrice(order.total_amount)}</td>
                            <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                              <Select
                                value={order.status || 'pending'}
                                onValueChange={(status) => updateOrderStatus.mutate({ id: order.id, status })}
                              >
                                <SelectTrigger className="w-32 bg-transparent border-[hsl(var(--gold-accent))]/20">
                                  <Badge className={statusColors[order.status || 'pending']}>{order.status}</Badge>
                                </SelectTrigger>
                                <SelectContent>
                                  {['pending', 'paid', 'measuring', 'production', 'shipped', 'delivered', 'cancelled'].map((s) => (
                                    <SelectItem key={s} value={s}>{s}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                              <Input
                                type="date"
                                value={order.delivery_date || ''}
                                onChange={(e) => setDeliveryDate.mutate({ id: order.id, delivery_date: e.target.value })}
                                className="w-36 bg-transparent border-[hsl(var(--gold-accent))]/20 text-[hsl(var(--warm-ivory))]"
                              />
                            </td>
                            <td className="px-4 py-4 text-[hsl(var(--muted-foreground))] text-sm">
                              {format(new Date(order.created_at), 'MMM d')}
                            </td>
                            <td className="px-4 py-4">
                              <ChevronRight className="w-5 h-5 text-[hsl(var(--muted-foreground))]" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl text-[hsl(var(--warm-ivory))] font-playfair">Product Inventory</h2>
              <Button onClick={() => setEditingProduct(undefined)} className="bg-[hsl(var(--gold-accent))] text-black hover:bg-[hsl(var(--gold-accent))]/90">
                <Plus className="w-4 h-4 mr-2" /> Add Product
              </Button>
            </div>

            {/* Product Form Modal */}
            {isProductModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <div
                  className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                  onClick={() => setIsProductModalOpen(false)}
                />

                {/* Modal */}
                <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[hsl(var(--bg-section))] rounded-3xl border border-[hsl(var(--gold-accent))]/20 shadow-2xl">
                  {/* Close Button */}
                  <button
                    onClick={() => setIsProductModalOpen(false)}
                    className="absolute top-4 right-4 z-10 p-2 bg-[hsl(var(--bg-section))] rounded-full text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--warm-ivory))] transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <div className="p-6">
                    <ProductForm
                      product={editingProduct}
                      onSuccess={() => setIsProductModalOpen(false)}
                      onCancel={() => setIsProductModalOpen(false)}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="bg-[hsl(var(--bg-section))] rounded-2xl border border-[hsl(var(--gold-accent))]/10 overflow-hidden">
              {productsLoading ? (
                <div className="p-12 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-[hsl(var(--gold-accent))]" /></div>
              ) : products?.length === 0 ? (
                <div className="p-12 text-center text-[hsl(var(--muted-foreground))]">
                  No products yet. Click "Add Product" to create your first product.
                </div>
              ) : (
                <>
                  {/* Mobile View - Enhanced Card Design */}
                  <div className="md:hidden space-y-4 p-4">
                    {products?.map((product) => {
                      const totalStock = Object.values(product.stock_levels).reduce((sum, qty) => sum + qty, 0);
                      return (
                        <div key={product.id} className="bg-[hsl(var(--deep-chocolate))] rounded-2xl border border-[hsl(var(--gold-accent))]/10 overflow-hidden hover:border-[hsl(var(--gold-accent))]/30 transition-colors">
                          {/* Header with Image and Basic Info */}
                          <div className="flex gap-4 p-4">
                            <div className="w-20 h-24 rounded-xl overflow-hidden bg-[hsl(var(--deep-burgundy))]/30 relative flex-shrink-0">
                              {product.images?.[0] ? (
                                <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Package className="w-6 h-6 text-[hsl(var(--gold-accent))]/50" />
                                </div>
                              )}
                              {product.is_featured && (
                                <div className="absolute -top-1 -right-1 bg-[hsl(var(--gold-accent))] rounded-full p-1">
                                  <Star className="w-3 h-3 text-[hsl(var(--deep-chocolate))] fill-current" />
                                </div>
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="text-[hsl(var(--warm-ivory))] font-semibold text-lg leading-tight pr-2">{product.title}</h3>
                                <div className="flex gap-1 flex-shrink-0">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                      setEditingProduct(product);
                                      setIsProductModalOpen(true);
                                    }}
                                    className="w-8 h-8 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--gold-accent))] hover:bg-[hsl(var(--gold-accent))]/10"
                                  >
                                    <Pencil className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="text-[hsl(var(--gold-accent))] border-[hsl(var(--gold-accent))]/30 text-xs">
                                  {product.category}
                                </Badge>
                                {product.is_featured && (
                                  <Badge className="bg-[hsl(var(--gold-accent))] text-[hsl(var(--deep-chocolate))] text-xs">
                                    Featured
                                  </Badge>
                                )}
                              </div>

                              <div className="flex items-baseline gap-2 mb-3">
                                <span className={`text-xl font-bold ${product.compare_at_price ? 'text-red-400' : 'text-[hsl(var(--warm-ivory))]'}`}>
                                  {formatPrice(product.price)}
                                </span>
                                {product.compare_at_price && (
                                  <span className="text-[hsl(var(--muted-foreground))] text-sm line-through">
                                    {formatPrice(product.compare_at_price)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Details Section */}
                          <div className="px-4 pb-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                  totalStock > 0
                                    ? 'bg-green-600/20 text-green-400'
                                    : 'bg-[hsl(var(--deep-burgundy))]/30 text-[hsl(var(--muted-foreground))]'
                                }`}>
                                  <div className={`w-2 h-2 rounded-full ${totalStock > 0 ? 'bg-green-400' : 'bg-[hsl(var(--muted-foreground))]'}`} />
                                  {totalStock > 0 ? `${totalStock} in stock` : 'Bespoke only'}
                                </div>
                              </div>

                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateProduct.mutate({ id: product.id, is_published: !product.is_published })}
                                className={`text-xs px-3 py-1 h-auto ${
                                  product.is_published
                                    ? 'text-green-400 hover:text-green-300'
                                    : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--warm-ivory))]'
                                }`}
                              >
                                {product.is_published ? (
                                  <>
                                    <Eye className="w-3 h-3 mr-1" />
                                    Published
                                  </>
                                ) : (
                                  <>
                                    <EyeOff className="w-3 h-3 mr-1" />
                                    Draft
                                  </>
                                )}
                              </Button>
                            </div>

                            {/* Colors */}
                            {product.colors && product.colors.length > 0 && (
                              <div className="mb-3">
                                <p className="text-[hsl(var(--muted-foreground))] text-xs mb-2 font-medium">Available Colors</p>
                                <div className="flex flex-wrap gap-2">
                                  {product.colors.slice(0, 6).map((color) => (
                                    <span
                                      key={color}
                                      className="px-3 py-1 bg-[hsl(var(--gold-accent))]/10 text-[hsl(var(--warm-ivory))] text-xs rounded-full border border-[hsl(var(--gold-accent))]/20"
                                    >
                                      {color}
                                    </span>
                                  ))}
                                  {product.colors.length > 6 && (
                                    <span className="px-3 py-1 bg-[hsl(var(--deep-chocolate))] text-[hsl(var(--muted-foreground))] text-xs rounded-full">
                                      +{product.colors.length - 6} more
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Production Time for Bespoke */}
                            {(!product.is_hybrid || totalStock === 0) && product.production_time && (
                              <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))] text-xs">
                                <Package className="w-3 h-3" />
                                Production: {product.production_time}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Desktop View - Original Layout */}
                  <div className="hidden md:block p-6">
                    <div className="space-y-4">
                      {products?.map((product) => {
                        const totalStock = Object.values(product.stock_levels).reduce((sum, qty) => sum + qty, 0);
                        return (
                          <div key={product.id} className="flex items-center gap-4 p-4 bg-[hsl(var(--deep-chocolate))] rounded-xl">
                            <div className="w-16 h-20 rounded-lg overflow-hidden bg-[hsl(var(--deep-burgundy))]/30 relative">
                              {product.images?.[0] && <img src={product.images[0]} alt="" className="w-full h-full object-cover" />}
                              {product.is_featured && <div className="absolute top-1 right-1"><Star className="w-3 h-3 text-[hsl(var(--gold-accent))] fill-[hsl(var(--gold-accent))]" /></div>}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-[hsl(var(--warm-ivory))] font-medium truncate">{product.title}</h3>
                                {product.is_featured && <Badge variant="outline" className="text-[hsl(var(--gold-accent))] border-[hsl(var(--gold-accent))]/30 text-[10px] py-0 h-5">Featured</Badge>}
                              </div>
                              <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))] text-sm flex-wrap">
                                <span>{product.category}</span>
                                <span>•</span>
                                <span className={product.compare_at_price ? "text-red-400" : ""}>{formatPrice(product.price)}</span>
                                {product.compare_at_price && <span className="line-through opacity-60 text-xs">{formatPrice(product.compare_at_price)}</span>}
                                <span>•</span>
                                <span className={totalStock > 0 ? 'text-green-400' : 'text-[hsl(var(--muted-foreground))]'}>{totalStock > 0 ? `${totalStock} in stock` : 'Bespoke only'}</span>
                              </div>
                              {product.colors && product.colors.length > 0 && (
                                <div className="flex gap-1 mt-1">
                                  {product.colors.slice(0, 4).map((color) => (
                                    <span key={color} className="text-[10px] bg-[hsl(var(--gold-accent))]/10 px-2 py-0.5 rounded text-[hsl(var(--muted-foreground))]">
                                      {color}
                                    </span>
                                  ))}
                                  {product.colors.length > 4 && (
                                    <span className="text-[10px] text-[hsl(var(--muted-foreground))]">+{product.colors.length - 4}</span>
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setEditingProduct(product);
                                  setIsProductModalOpen(true);
                                }}
                                className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--gold-accent))]"
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateProduct.mutate({ id: product.id, is_published: !product.is_published })}
                                className="text-[hsl(var(--warm-ivory))]"
                              >
                                {product.is_published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                <span className="ml-2 hidden sm:inline">{product.is_published ? 'Published' : 'Draft'}</span>
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal 
        order={selectedOrder} 
        onClose={() => setSelectedOrder(null)} 
        formatPrice={formatPrice}
      />
    </div>
  );
};

export default Admin;
