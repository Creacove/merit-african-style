import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Consultation } from '@/types/database';
import { toast } from 'sonner';

// Admin: Fetch all consultations
export function useConsultations() {
  return useQuery({
    queryKey: ['consultations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('consultations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching consultations:', error);
        throw error;
      }

      return data as Consultation[];
    },
  });
}

// Admin: Update consultation status
export function useUpdateConsultationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { data, error } = await supabase
        .from('consultations')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['consultations'] });
      toast.success('Consultation status updated');
    },
    onError: (error) => {
      console.error('Error updating consultation:', error);
      toast.error('Failed to update consultation');
    },
  });
}

// Create consultation request (public)
interface CreateConsultationInput {
  customer_name: string;
  phone: string;
  email?: string;
  preferred_date?: string;
  product_interest?: string;
  message?: string;
}

export function useCreateConsultation() {
  return useMutation({
    mutationFn: async (data: CreateConsultationInput) => {
      const { data: consultation, error } = await supabase
        .from('consultations')
        .insert({
          customer_name: data.customer_name,
          phone: data.phone,
          email: data.email || null,
          preferred_date: data.preferred_date || null,
          product_interest: data.product_interest || null,
          message: data.message || null,
          status: 'new',
        })
        .select()
        .single();

      if (error) throw error;
      return consultation;
    },
    onSuccess: () => {
      toast.success('Consultation request submitted! We\'ll contact you soon.');
    },
    onError: (error) => {
      console.error('Error creating consultation:', error);
      toast.error('Failed to submit request. Please try again.');
    },
  });
}
