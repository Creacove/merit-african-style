import { useState } from "react";
import { useCreateProduct, useUpdateProduct } from "@/hooks/useProducts";
import { Product } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CATEGORIES } from "@/types/database";
import { Loader2, Plus, X, Upload } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ProductFormProps {
    product?: Product;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export const ProductForm = ({ product, onSuccess, onCancel }: ProductFormProps) => {
    const createProduct = useCreateProduct();
    const updateProduct = useUpdateProduct();

    const [formData, setFormData] = useState({
        title: product?.title || "",
        description: product?.description || "",
        price: product?.price || 0,
        compare_at_price: product?.compare_at_price || null as number | null,
        category: product?.category || CATEGORIES[0],
        images: product?.images?.join("\n") || "",
        is_hybrid: product?.is_hybrid ?? true,
        is_published: product?.is_published ?? false,
        is_featured: product?.is_featured ?? false,
        production_time: product?.production_time || "2 Weeks",
    });

    const [isUploading, setIsUploading] = useState(false);

    const isEditing = !!product;
    const isLoading = createProduct.isPending || updateProduct.isPending || isUploading;

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('product-images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage
                .from('product-images')
                .getPublicUrl(filePath);

            const currentImages = formData.images ? formData.images.split('\n') : [];
            const newImages = [...currentImages, data.publicUrl].filter(Boolean).join('\n');

            setFormData(prev => ({ ...prev, images: newImages }));
            toast.success('Image uploaded successfully');
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Failed to upload image. Make sure "product-images" bucket exists.');
        } finally {
            setIsUploading(false);
            // Reset input
            e.target.value = '';
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const imageArray = formData.images.split("\n").map((url) => url.trim()).filter(Boolean);

            const payload = {
                title: formData.title,
                description: formData.description,
                price: Number(formData.price),
                compare_at_price: formData.compare_at_price ? Number(formData.compare_at_price) : null,
                category: formData.category,
                images: imageArray,
                is_hybrid: formData.is_hybrid,
                is_published: formData.is_published,
                is_featured: formData.is_featured,
                production_time: formData.production_time,
                stock_levels: product?.stock_levels || { S: 0, M: 0, L: 0, XL: 0, XXL: 0 },
                model_stats: product?.model_stats || null,
            };

            if (isEditing) {
                await updateProduct.mutateAsync({ id: product.id, ...payload });
            } else {
                await createProduct.mutateAsync(payload);
            }

            toast.success(isEditing ? "Product updated" : "Product created");
            onSuccess?.();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-[hsl(var(--bg-section))] p-6 rounded-lg text-[hsl(var(--warm-ivory))] max-h-[80vh] overflow-y-auto">
            <div className="space-y-4">
                <h2 className="text-xl font-bold font-playfair">{isEditing ? "Edit Product" : "New Product"}</h2>

                <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        className="bg-[hsl(var(--deep-chocolate))]/50 border-[hsl(var(--gold-accent))]/20"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="price">Price (₦)</Label>
                        <Input
                            id="price"
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                            required
                            className="bg-[hsl(var(--deep-chocolate))]/50 border-[hsl(var(--gold-accent))]/20"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="compare_at_price">Original Price (Optional)</Label>
                        <Input
                            id="compare_at_price"
                            type="number"
                            value={formData.compare_at_price || ""}
                            onChange={(e) => setFormData({ ...formData, compare_at_price: e.target.value ? Number(e.target.value) : null })}
                            className="bg-[hsl(var(--deep-chocolate))]/50 border-[hsl(var(--gold-accent))]/20"
                            placeholder="Strike-through price"
                        />
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                        value={formData.category}
                        onValueChange={(val) => setFormData({ ...formData, category: val })}
                    >
                        <SelectTrigger className="bg-[hsl(var(--deep-chocolate))]/50 border-[hsl(var(--gold-accent))]/20">
                            <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {CATEGORIES.map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                    {cat}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="bg-[hsl(var(--deep-chocolate))]/50 border-[hsl(var(--gold-accent))]/20"
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="images">Images</Label>
                    <div className="flex gap-2 mb-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById('image-upload')?.click()}
                            disabled={isUploading}
                            className="bg-[hsl(var(--deep-chocolate))] border-[hsl(var(--gold-accent))]/30 hover:bg-[hsl(var(--gold-accent))]/10"
                        >
                            {isUploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Upload className="w-4 h-4 mr-2" />}
                            Upload Image
                        </Button>
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileUpload}
                        />
                    </div>
                    <Textarea
                        id="images"
                        value={formData.images}
                        onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                        className="bg-[hsl(var(--deep-chocolate))]/50 border-[hsl(var(--gold-accent))]/20 font-mono text-xs"
                        placeholder="Image URLs (one per line)..."
                        rows={3}
                    />
                    {/* Image Previews */}
                    {formData.images && (
                        <div className="flex gap-2 overflow-x-auto py-2">
                            {formData.images.split('\n').filter(Boolean).map((url, i) => (
                                <div key={i} className="relative w-16 h-16 shrink-0 rounded border border-[hsl(var(--gold-accent))]/20 overflow-hidden group">
                                    <img src={url} alt="" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newImages = formData.images.split('\n').filter((_, idx) => idx !== i).join('\n');
                                            setFormData(prev => ({ ...prev, images: newImages }));
                                        }}
                                        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="space-y-4 pt-4 border-t border-[hsl(var(--gold-accent))]/10">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="is_published" className="flex flex-col gap-1">
                            <span>Published</span>
                            <span className="text-xs text-muted-foreground">Visible in store</span>
                        </Label>
                        <Switch
                            id="is_published"
                            checked={formData.is_published}
                            onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <Label htmlFor="is_featured" className="flex flex-col gap-1">
                            <span>Featured</span>
                            <span className="text-xs text-muted-foreground">Show in Home Carousel</span>
                        </Label>
                        <Switch
                            id="is_featured"
                            checked={formData.is_featured}
                            onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                            className="data-[state=checked]:bg-[hsl(var(--gold-accent))]"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="ghost" onClick={onCancel} disabled={isLoading}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="bg-[hsl(var(--gold-accent))] text-black hover:bg-[hsl(var(--gold-accent))]/90">
                    {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {isEditing ? "Update Product" : "Create Product"}
                </Button>
            </div>
        </form>
    );
};
