PGDMP                      }            report_handling_system    17.3    17.3                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false                       1262    32777    report_handling_system    DATABASE     |   CREATE DATABASE report_handling_system WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en-US';
 &   DROP DATABASE report_handling_system;
                     postgres    false                        2615    32778    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                     postgres    false                       0    0    SCHEMA public    COMMENT         COMMENT ON SCHEMA public IS '';
                        postgres    false    5                       0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                        postgres    false    5            U           1247    32789 
   ReportType    TYPE     r   CREATE TYPE public."ReportType" AS ENUM (
    'review',
    'user',
    'business',
    'service',
    'other'
);
    DROP TYPE public."ReportType";
       public               postgres    false    5            X           1247    32800    UserRole    TYPE     C   CREATE TYPE public."UserRole" AS ENUM (
    'user',
    'admin'
);
    DROP TYPE public."UserRole";
       public               postgres    false    5            �            1259    32779    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap r       postgres    false    5            �            1259    32806    report    TABLE     r  CREATE TABLE public.report (
    id bigint NOT NULL,
    type public."ReportType" NOT NULL,
    target_id bigint NOT NULL,
    reason character varying(255) NOT NULL,
    description text,
    submitted_by bigint,
    resolved_by bigint,
    resolved_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.report;
       public         heap r       postgres    false    853    5            �            1259    32805    report_id_seq    SEQUENCE     v   CREATE SEQUENCE public.report_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.report_id_seq;
       public               postgres    false    219    5                       0    0    report_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.report_id_seq OWNED BY public.report.id;
          public               postgres    false    218            �            1259    32816    user    TABLE     �   CREATE TABLE public."user" (
    id bigint NOT NULL,
    email text NOT NULL,
    name text,
    role public."UserRole" DEFAULT 'user'::public."UserRole" NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public."user";
       public         heap r       postgres    false    856    5    856            �            1259    32815    user_id_seq    SEQUENCE     t   CREATE SEQUENCE public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public               postgres    false    5    221                       0    0    user_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;
          public               postgres    false    220            h           2604    32809 	   report id    DEFAULT     f   ALTER TABLE ONLY public.report ALTER COLUMN id SET DEFAULT nextval('public.report_id_seq'::regclass);
 8   ALTER TABLE public.report ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    218    219    219            j           2604    32819    user id    DEFAULT     d   ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
 8   ALTER TABLE public."user" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    221    220    221                      0    32779    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public               postgres    false    217   ,!       	          0    32806    report 
   TABLE DATA           ~   COPY public.report (id, type, target_id, reason, description, submitted_by, resolved_by, resolved_at, created_at) FROM stdin;
    public               postgres    false    219   I!                 0    32816    user 
   TABLE DATA           C   COPY public."user" (id, email, name, role, created_at) FROM stdin;
    public               postgres    false    221   �"                  0    0    report_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.report_id_seq', 19, true);
          public               postgres    false    218                       0    0    user_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.user_id_seq', 1, false);
          public               postgres    false    220            n           2606    32787 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public                 postgres    false    217            p           2606    32814    report report_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.report
    ADD CONSTRAINT report_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.report DROP CONSTRAINT report_pkey;
       public                 postgres    false    219            s           2606    32825    user user_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public                 postgres    false    221            q           1259    32826    user_email_key    INDEX     I   CREATE UNIQUE INDEX user_email_key ON public."user" USING btree (email);
 "   DROP INDEX public.user_email_key;
       public                 postgres    false    221            t           2606    32832    report report_resolved_by_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.report
    ADD CONSTRAINT report_resolved_by_fkey FOREIGN KEY (resolved_by) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 H   ALTER TABLE ONLY public.report DROP CONSTRAINT report_resolved_by_fkey;
       public               postgres    false    219    4723    221            u           2606    32827    report report_submitted_by_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.report
    ADD CONSTRAINT report_submitted_by_fkey FOREIGN KEY (submitted_by) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 I   ALTER TABLE ONLY public.report DROP CONSTRAINT report_submitted_by_fkey;
       public               postgres    false    4723    219    221                  x������ � �      	   x  x�u��n�0���@�؎ȵ{X�a/{�B�Aj�����o�M5@%��|�i��NC����۷���9�3<����=X�l��#5X��md��iY�����ك�i�C^�*/��(�H\�s�*��+���ˉ�%���"��9ydφ�?�0���]������mi��t�_S����ksZW|�ġ��ch���3�e
�|���>vje�$(���֣1���Y��>����5��co������K�Rr�e8�?P��:�(��������r��)_~�M�Q$W
��+�����^�"�:��&UQV�ZBˊޖ�p��S5
a��Yч�67V�c��x�m��0���=�U��%DנZ���!���	�1���R         V   x�3�LL���s(N-*��(M�K���t	)�� ��FF��&�F
�VVF&z��\F��@E���A���R�r8���qqq i�"�     