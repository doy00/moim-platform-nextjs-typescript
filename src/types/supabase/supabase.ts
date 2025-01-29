export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      liked_moims: {
        Row: {
          created_at: string;
          id: string;
          moim_uuid: string;
          updated_at: string;
          user_uuid: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          moim_uuid?: string;
          updated_at?: string;
          user_uuid?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          moim_uuid?: string;
          updated_at?: string;
          user_uuid?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'liked_moims_moim_uuid_fkey';
            columns: ['moim_uuid'];
            isOneToOne: false;
            referencedRelation: 'moims';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'liked_moims_user_uuid_fkey';
            columns: ['user_uuid'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      moims: {
        Row: {
          address: string;
          category: Database['public']['Enums']['moim_category'];
          content: string;
          created_at: string;
          end_date: string;
          id: string;
          images: string[] | null;
          liked_counts: number;
          master_email: string;
          max_participants: number;
          min_participants: number;
          participants_counts: number;
          recruitment_deadline: string;
          reviews_counts: number;
          start_date: string;
          status: Database['public']['Enums']['moim_status'];
          title: string;
          updated_at: string;
        };
        Insert: {
          address?: string;
          category?: Database['public']['Enums']['moim_category'];
          content?: string;
          created_at?: string;
          end_date?: string;
          id?: string;
          images?: string[] | null;
          liked_counts?: number;
          master_email?: string;
          max_participants?: number;
          min_participants?: number;
          participants_counts?: number;
          recruitment_deadline?: string;
          reviews_counts?: number;
          start_date?: string;
          status?: Database['public']['Enums']['moim_status'];
          title?: string;
          updated_at?: string;
        };
        Update: {
          address?: string;
          category?: Database['public']['Enums']['moim_category'];
          content?: string;
          created_at?: string;
          end_date?: string;
          id?: string;
          images?: string[] | null;
          liked_counts?: number;
          master_email?: string;
          max_participants?: number;
          min_participants?: number;
          participants_counts?: number;
          recruitment_deadline?: string;
          reviews_counts?: number;
          start_date?: string;
          status?: Database['public']['Enums']['moim_status'];
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      participated_moims: {
        Row: {
          created_at: string;
          id: string;
          moim_uuid: string | null;
          updated_at: string;
          user_uuid: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          moim_uuid?: string | null;
          updated_at?: string;
          user_uuid?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          moim_uuid?: string | null;
          updated_at?: string;
          user_uuid?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: '\bparticipated_moims_moim_uuid_fkey';
            columns: ['moim_uuid'];
            isOneToOne: false;
            referencedRelation: 'moims';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: '\bparticipated_moims_user_uuid_fkey';
            columns: ['user_uuid'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      reviews: {
        Row: {
          created_at: string;
          id: string;
          moim_uuid: string;
          rate: Database['public']['Enums']['review_status'];
          review: string;
          updated_at: string;
          user_uuid: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          moim_uuid?: string;
          rate?: Database['public']['Enums']['review_status'];
          review?: string;
          updated_at?: string;
          user_uuid?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          moim_uuid?: string;
          rate?: Database['public']['Enums']['review_status'];
          review?: string;
          updated_at?: string;
          user_uuid?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'reviews_moim_uuid_fkey';
            columns: ['moim_uuid'];
            isOneToOne: false;
            referencedRelation: 'moims';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reviews_user_uuid_fkey';
            columns: ['user_uuid'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      users: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          image: string | null;
          introduction: string | null;
          nickname: string;
          position: Database['public']['Enums']['user_position'] | null;
          tags: string[] | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          email?: string;
          id?: string;
          image?: string | null;
          introduction?: string | null;
          nickname?: string;
          position?: Database['public']['Enums']['user_position'] | null;
          tags?: string[] | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          image?: string | null;
          introduction?: string | null;
          nickname?: string;
          position?: Database['public']['Enums']['user_position'] | null;
          tags?: string[] | null;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      moim_category: 'PROJECT' | 'STUDY' | 'INTERVIEW';
      moim_status: 'RECRUIT' | 'PROGRESS' | 'END';
      review_status: 'SOSO' | 'GOOD' | 'RECOMMEND';
      user_position: 'BACKEND' | 'FRONTEND' | 'PM' | 'DESIGNER';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;
