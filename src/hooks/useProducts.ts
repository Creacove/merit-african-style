import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/database';
import { toast } from 'sonner';
import { Json } from '@/integrations/supabase/types';

// Fetch all published products
export function useProducts(category?: string) {
  return useQuery({
    queryKey: ['products', category],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }

      // Transform data to match our Product type
      return (data || []).map((p) => {
        const product = p as Record<string, unknown>;
        return {
          ...p,
          images: p.images || [],
          colors: (product.colors as string[]) || [],
          is_hybrid: p.is_hybrid ?? true,
          is_published: p.is_published ?? false,
          is_featured: (product.is_featured as boolean) ?? false,
          compare_at_price: (product.compare_at_price as number | null) ?? null,
          production_time: p.production_time || '2 Weeks',
          stock_levels: (p.stock_levels as Record<string, number>) || { S: 0, M: 0, L: 0, XL: 0, XXL: 0 },
        };
      }) as Product[];
    },
  });
}

// Fetch single product
export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching product:', error);
        throw error;
      }

      if (!data) return null;

      const product = data as Record<string, unknown>;
      return {
        ...data,
        images: data.images || [],
        colors: (product.colors as string[]) || [],
        is_hybrid: data.is_hybrid ?? true,
        is_published: data.is_published ?? false,
        is_featured: (product.is_featured as boolean) ?? false,
        compare_at_price: (product.compare_at_price as number | null) ?? null,
        production_time: data.production_time || '2 Weeks',
        stock_levels: (data.stock_levels as Record<string, number>) || { S: 0, M: 0, L: 0, XL: 0, XXL: 0 },
      } as Product;
    },
    enabled: !!id,
  });
}

// Admin: Fetch all products (including unpublished)
export function useAdminProducts() {
  return useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching admin products:', error);
        throw error;
      }

      return (data || []).map((p) => {
        const product = p as Record<string, unknown>;
        return {
          ...p,
          images: p.images || [],
          colors: (product.colors as string[]) || [],
          is_hybrid: p.is_hybrid ?? true,
          is_published: p.is_published ?? false,
          is_featured: (product.is_featured as boolean) ?? false,
          compare_at_price: (product.compare_at_price as number | null) ?? null,
          production_time: p.production_time || '2 Weeks',
          stock_levels: (p.stock_levels as Record<string, number>) || { S: 0, M: 0, L: 0, XL: 0, XXL: 0 },
        };
      }) as Product[];
    },
  });
}

// Admin: Create product
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
      // Use type assertion for fields that may not be in generated types yet
      const insertData = {
        title: product.title,
        description: product.description,
        price: product.price,
        images: product.images,
        colors: product.colors,
        category: product.category,
        is_hybrid: product.is_hybrid,
        stock_levels: product.stock_levels as unknown as Json,
        production_time: product.production_time,
        model_stats: product.model_stats,
        is_published: product.is_published,
        is_featured: product.is_featured,
        compare_at_price: product.compare_at_price,
      } as Record<string, unknown>;

      const { data, error } = await supabase
        .from('products')
        .insert(insertData as never)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product created successfully');
    },
    onError: (error) => {
      console.error('Error creating product:', error);
      toast.error('Failed to create product');
    },
  });
}

// Admin: Update product
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Product> & { id: string }) => {
      const updateData: Record<string, unknown> = {};

      if (updates.title !== undefined) updateData.title = updates.title;
      if (updates.description !== undefined) updateData.description = updates.description;
      if (updates.price !== undefined) updateData.price = updates.price;
      if (updates.images !== undefined) updateData.images = updates.images;
      if (updates.colors !== undefined) updateData.colors = updates.colors;
      if (updates.category !== undefined) updateData.category = updates.category;
      if (updates.is_hybrid !== undefined) updateData.is_hybrid = updates.is_hybrid;
      if (updates.stock_levels !== undefined) updateData.stock_levels = updates.stock_levels as unknown as Json;
      if (updates.production_time !== undefined) updateData.production_time = updates.production_time;
      if (updates.model_stats !== undefined) updateData.model_stats = updates.model_stats;
      if (updates.is_published !== undefined) updateData.is_published = updates.is_published;
      if (updates.is_featured !== undefined) updateData.is_featured = updates.is_featured;
      if (updates.compare_at_price !== undefined) updateData.compare_at_price = updates.compare_at_price;

      const { data, error } = await supabase
        .from('products')
        .update(updateData as never)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', variables.id] });
      toast.success('Product updated successfully');
    },
    onError: (error) => {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    },
  });
}

// Admin: Delete product
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product deleted successfully');
    },
    onError: (error) => {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    },
  });
}
