export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type item = Database["public"]["Tables"]["items"]["Row"];
export type purchaserecord =
  Database["public"]["Tables"]["purchaserecord"]["Row"];
export type salesrecord = Database["public"]["Tables"]["salesrecord"]["Row"];

export type Database = {
  public: {
    Tables: {
      items: {
        Row: {
          category: string | null;
          expiry: string | null;
          id: number;
          name: string;
          price: number;
          quantity: number;
          sales: number;
          user_id: string;
        };
        Insert: {
          category?: string | null;
          expiry?: string | null;
          id?: number;
          name: string;
          price: number;
          quantity?: number;
          sales?: number;
          user_id?: string;
        };
        Update: {
          category?: string | null;
          expiry?: string | null;
          id?: number;
          name?: string;
          price?: number;
          quantity?: number;
          sales?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_items_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      purchaserecord: {
        Row: {
          current_quantity: number;
          date: string;
          expiry: string;
          id: number;
          item_id: number;
          quantity: number;
          user_id: string;
        };
        Insert: {
          current_quantity: number;
          date: string;
          expiry: string;
          id?: number;
          item_id: number;
          quantity: number;
          user_id?: string;
        };
        Update: {
          current_quantity?: number;
          date?: string;
          expiry?: string;
          id?: number;
          item_id?: number;
          quantity?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_purchaserecord_item_id_fkey";
            columns: ["item_id"];
            isOneToOne: false;
            referencedRelation: "items";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_purchaserecord_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      salesrecord: {
        Row: {
          date: string;
          id: number;
          item_id: number;
          quantity: number;
          user_id: string;
        };
        Insert: {
          date: string;
          id?: number;
          item_id: number;
          quantity: number;
          user_id?: string;
        };
        Update: {
          date?: string;
          id?: number;
          item_id?: number;
          quantity?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_salesrecord_item_id_fkey";
            columns: ["item_id"];
            isOneToOne: false;
            referencedRelation: "items";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_salesrecord_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;
