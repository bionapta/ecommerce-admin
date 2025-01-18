"use client";

import * as z from "zod";
import axios from "axios";

import { useState } from "react";
import { useStoreModal } from "@/hooks/use-store-modal";
import Modal from "../ui/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(1).max(50),
});

export const StoreModal = () => {
  const [loading, setLoading] = useState(false);

  const StoreModal = useStoreModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const response = await axios.post("/api/stores", values);
      console.log(response.data);
      toast.success("Sip! Berhasil membuat toko :D");
      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      toast.error("Duh! Gagal membuat toko :(");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Buat Store Dulu!"
      description="Buat store kamu dulu yuk untuk mulai kelola produk dan kategori :)"
      isOpen={StoreModal.isOpen}
      onClose={StoreModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Toko</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan nama toko kamu (Contoh: YONStore)"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  disabled={loading}
                  variant="outline"
                  onClick={StoreModal.onClose}
                >
                  Batal
                </Button>
                <Button disabled={loading} type="submit">
                  Lanjutkan
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
