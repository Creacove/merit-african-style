import { useState } from "react";
import { useCreateProduct, useUpdateProduct } from "@/hooks/useProducts";
import { Product, SIZES } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CATEGORIES } from "@/types/database";
import { Loader2, Plus, X, Upload, Palette } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ProductFormProps {
    product?: Product;
    onSuccess?: () => void;
    onCancel?: () => void;
}

const DEFAULT_COLORS = [
    { name: "White", hex: "#FFFFFF" },
    { name: "Black", hex: "#000000" },
    { name: "Navy", hex: "#1e3a5f" },
    { name: "Brown", hex: "#8B4513" },
    { name: "Burgundy", hex: "#722F37" },
    { name: "Gold", hex: "#D4AF37" },
    { name: "Cream", hex: "#FFFDD0" },
    { name: "Green", hex: "#228B22" },
    { name: "Blue", hex: "#0066CC" },
    { name: "Red", hex: "#CC0000" },
];

export const ProductForm = ({ product, onSuccess, onCancel }: ProductFormProps) => {
    const createProduct = useCreateProduct();
    const updateProduct = useUpdateProduct();

    const [formData, setFormData] = useState({
        title: product?.title || "",
        description: product?.description || "",
        price: product?.price || 0,
        compare_at_price: product?.compare_at_price || null as number | null,
        category: product?.category || CATEGORIES[0],
        images: product?.images || [] as string[],
        colors: product?.colors || [] as string[],
        is_hybrid: product?.is_hybrid ?? true,
        is_published: product?.is_published ?? false,
        is_featured: product?.is_featured ?? false,
        production_time: product?.production_time || "2 Weeks",
        stock_levels: product?.stock_levels || { S: 0, M: 0, L: 0, XL: 0, XXL: 0 } as Record<string, number>,
    });

    const [isUploading, setIsUploading] = useState(false);
    const [newColor, setNewColor] = useState("");

    const isEditing = !!product;
    const isLoading = createProduct.isPending || updateProduct.isPending || isUploading;

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setIsUploading(true);
        const uploadedUrls: string[] = [];

        try {
            for (const file of Array.from(files)) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

                const { error: uploadError } = await supabase.storage
                    .from('product-images')
                    .upload(fileName, file);

                if (uploadError) throw uploadError;

                const { data } = supabase.storage
                    .from('product-images')
                    .getPublicUrl(fileName);

                uploadedUrls.push(data.publicUrl);
            }

            setFormData(prev => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
            toast.success(`${uploadedUrls.length} image(s) uploaded successfully`);
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Failed to upload image(s).');
        } finally {
            setIsUploading(false);
            e.target.value = '';
        }
    };

    const removeImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const addColor = (colorName: string) => {
        if (colorName && !formData.colors.includes(colorName)) {
            setFormData(prev => ({ ...prev, colors: [...prev.colors, colorName] }));
        }
        setNewColor("");
    };

    const removeColor = (colorName: string) => {
        setFormData(prev => ({
            ...prev,
            colors: prev.colors.filter(c => c !== colorName)
        }));
    };

    const updateStockLevel = (size: string, quantity: number) => {
        setFormData(prev => ({
            ...prev,
            stock_levels: { ...prev.stock_levels, [size]: Math.max(0, quantity) }
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            toast.error("Please enter a product title");
            return;
        }

        if (formData.price <= 0) {
            toast.error("Please enter a valid price");
            return;
        }

        try {
            const payload = {
                title: formData.title,
                description: formData.description || null,
                price: Number(formData.price),
                compare_at_price: formData.compare_at_price ? Number(formData.compare_at_price) : null,
                category: formData.category,
                images: formData.images,
                colors: formData.colors,
                is_hybrid: formData.is_hybrid,
                is_published: formData.is_published,
                is_featured: formData.is_featured,
                production_time: formData.production_time,
                stock_levels: formData.stock_levels,
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

    const totalStock = Object.values(formData.stock_levels).reduce((sum, qty) => sum + qty, 0);

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-[hsl(var(--bg-section))] p-6 rounded-lg text-[hsl(var(--warm-ivory))] max-h-[80vh] overflow-y-auto">
            <div className="space-y-4">
                <h2 className="text-xl font-bold font-playfair">{isEditing ? "Edit Product" : "New Product"}</h2>

                {/* Title */}
                <div className="grid gap-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        className="bg-[hsl(var(--deep-chocolate))]/50 border-[hsl(var(--gold-accent))]/20"
                        placeholder="e.g. Royal Agbada Set"
                    />
                </div>

                {/* Price & Compare Price */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="price">Price (₦) *</Label>
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
                        <Label htmlFor="compare_at_price">Compare Price (Optional)</Label>
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

                {/* Category & Production Time */}
                <div className="grid grid-cols-2 gap-4">
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
                        <Label htmlFor="production_time">Production Time</Label>
                        <Select
                            value={formData.production_time}
                            onValueChange={(val) => setFormData({ ...formData, production_time: val })}
                        >
                            <SelectTrigger className="bg-[hsl(var(--deep-chocolate))]/50 border-[hsl(var(--gold-accent))]/20">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {["1 Week", "2 Weeks", "3 Weeks", "4 Weeks", "6 Weeks"].map((time) => (
                                    <SelectItem key={time} value={time}>{time}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Description */}
                <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="bg-[hsl(var(--deep-chocolate))]/50 border-[hsl(var(--gold-accent))]/20"
                        placeholder="Describe the product, fabric, and craftsmanship..."
                        rows={3}
                    />
                </div>

                {/* Images Upload */}
                <div className="grid gap-2">
                    <Label>Product Images</Label>
                    <div className="flex gap-2 mb-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById('image-upload')?.click()}
                            disabled={isUploading}
                            className="bg-[hsl(var(--deep-chocolate))] border-[hsl(var(--gold-accent))]/30 hover:bg-[hsl(var(--gold-accent))]/10"
                        >
                            {isUploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Upload className="w-4 h-4 mr-2" />}
                            Upload Images
                        </Button>
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handleFileUpload}
                        />
                    </div>
                    
                    {/* Image Previews */}
                    {formData.images.length > 0 ? (
                        <div className="flex gap-2 flex-wrap py-2">
                            {formData.images.map((url, i) => (
                                <div key={i} className={`relative shrink-0 rounded-lg border-2 overflow-hidden group ${i === 0 ? 'w-24 h-28 border-[hsl(var(--gold-accent))]' : 'w-16 h-20 border-[hsl(var(--gold-accent))]/20'}`}>
                                    <img src={url} alt="" className="w-full h-full object-cover" />
                                    {i === 0 && (
                                        <span className="absolute top-1 left-1 text-[8px] bg-[hsl(var(--gold-accent))] text-black px-1 rounded font-bold">
                                            MAIN
                                        </span>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => removeImage(i)}
                                        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-[hsl(var(--muted-foreground))] text-sm">No images uploaded yet</p>
                    )}
                </div>

                {/* Colors */}
                <div className="grid gap-2">
                    <Label className="flex items-center gap-2">
                        <Palette className="w-4 h-4" /> Available Colors
                    </Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {formData.colors.map((color) => (
                            <span key={color} className="flex items-center gap-1 bg-[hsl(var(--deep-chocolate))] px-3 py-1 rounded-full text-sm border border-[hsl(var(--gold-accent))]/20">
                                {color}
                                <button type="button" onClick={() => removeColor(color)} className="ml-1 hover:text-red-400">
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {DEFAULT_COLORS.filter(c => !formData.colors.includes(c.name)).slice(0, 6).map((color) => (
                            <button
                                key={color.name}
                                type="button"
                                onClick={() => addColor(color.name)}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border border-[hsl(var(--gold-accent))]/20 hover:border-[hsl(var(--gold-accent))] transition-colors"
                            >
                                <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: color.hex }} />
                                {color.name}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-2 mt-2">
                        <Input
                            placeholder="Custom color name..."
                            value={newColor}
                            onChange={(e) => setNewColor(e.target.value)}
                            className="bg-[hsl(var(--deep-chocolate))]/50 border-[hsl(var(--gold-accent))]/20 flex-1"
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addColor(newColor))}
                        />
                        <Button type="button" variant="outline" size="sm" onClick={() => addColor(newColor)} className="border-[hsl(var(--gold-accent))]/30">
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Stock Levels (Ready-to-Wear) */}
                <div className="grid gap-2 pt-4 border-t border-[hsl(var(--gold-accent))]/10">
                    <Label className="flex items-center justify-between">
                        <span>Stock Levels (Ready-to-Wear)</span>
                        <span className="text-[hsl(var(--gold-accent))] text-sm font-normal">
                            Total: {totalStock} in stock
                        </span>
                    </Label>
                    <p className="text-[hsl(var(--muted-foreground))] text-xs mb-2">
                        Set quantity &gt; 0 for sizes that are ready to ship immediately
                    </p>
                    <div className="grid grid-cols-5 gap-2">
                        {SIZES.map((size) => (
                            <div key={size} className="text-center">
                                <Label className="text-xs text-[hsl(var(--muted-foreground))]">{size}</Label>
                                <Input
                                    type="number"
                                    min="0"
                                    value={formData.stock_levels[size] || 0}
                                    onChange={(e) => updateStockLevel(size, parseInt(e.target.value) || 0)}
                                    className="bg-[hsl(var(--deep-chocolate))]/50 border-[hsl(var(--gold-accent))]/20 text-center mt-1"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Toggles */}
                <div className="space-y-4 pt-4 border-t border-[hsl(var(--gold-accent))]/10">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="is_hybrid" className="flex flex-col gap-1">
                            <span>Allow Bespoke Orders</span>
                            <span className="text-xs text-muted-foreground">Customers can order custom sizes even when out of stock</span>
                        </Label>
                        <Switch
                            id="is_hybrid"
                            checked={formData.is_hybrid}
                            onCheckedChange={(checked) => setFormData({ ...formData, is_hybrid: checked })}
                        />
                    </div>

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