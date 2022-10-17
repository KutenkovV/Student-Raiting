--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

-- Started on 2022-10-17 18:00:13

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 233 (class 1259 OID 34845)
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    email character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    date timestamp with time zone NOT NULL
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16395)
-- Name: courselevels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.courselevels (
    id integer NOT NULL,
    level integer NOT NULL
);


ALTER TABLE public.courselevels OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 16398)
-- Name: courselevels_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.courselevels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.courselevels_id_seq OWNER TO postgres;

--
-- TOC entry 3622 (class 0 OID 0)
-- Dependencies: 210
-- Name: courselevels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.courselevels_id_seq OWNED BY public.courselevels.id;


--
-- TOC entry 211 (class 1259 OID 16399)
-- Name: courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.courses (
    id integer NOT NULL,
    title character varying(4) NOT NULL
);


ALTER TABLE public.courses OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 16402)
-- Name: courses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.courses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.courses_id_seq OWNER TO postgres;

--
-- TOC entry 3623 (class 0 OID 0)
-- Dependencies: 212
-- Name: courses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.courses_id_seq OWNED BY public.courses.id;


--
-- TOC entry 213 (class 1259 OID 16403)
-- Name: datetable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.datetable (
    id integer NOT NULL,
    date daterange NOT NULL
);


ALTER TABLE public.datetable OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16408)
-- Name: datetable_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.datetable_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.datetable_id_seq OWNER TO postgres;

--
-- TOC entry 3624 (class 0 OID 0)
-- Dependencies: 214
-- Name: datetable_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.datetable_id_seq OWNED BY public.datetable.id;


--
-- TOC entry 215 (class 1259 OID 16409)
-- Name: rating; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rating (
    id integer NOT NULL,
    points double precision NOT NULL,
    ratingcoursesid bigint NOT NULL
);


ALTER TABLE public.rating OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16412)
-- Name: rating_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rating_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rating_id_seq OWNER TO postgres;

--
-- TOC entry 3625 (class 0 OID 0)
-- Dependencies: 216
-- Name: rating_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rating_id_seq OWNED BY public.rating.id;


--
-- TOC entry 217 (class 1259 OID 16413)
-- Name: ratingcount; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ratingcount (
    id integer NOT NULL,
    courseid smallint NOT NULL,
    count integer NOT NULL,
    dateid bigint NOT NULL
);


ALTER TABLE public.ratingcount OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16416)
-- Name: ratingcount_dateid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ratingcount_dateid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ratingcount_dateid_seq OWNER TO postgres;

--
-- TOC entry 3626 (class 0 OID 0)
-- Dependencies: 218
-- Name: ratingcount_dateid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ratingcount_dateid_seq OWNED BY public.ratingcount.dateid;


--
-- TOC entry 219 (class 1259 OID 16417)
-- Name: ratingcount_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ratingcount_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ratingcount_id_seq OWNER TO postgres;

--
-- TOC entry 3627 (class 0 OID 0)
-- Dependencies: 219
-- Name: ratingcount_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ratingcount_id_seq OWNED BY public.ratingcount.id;


--
-- TOC entry 220 (class 1259 OID 16418)
-- Name: ratingcourses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ratingcourses (
    id integer NOT NULL,
    courseid bigint NOT NULL,
    levelid bigint NOT NULL
);


ALTER TABLE public.ratingcourses OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16421)
-- Name: ratingcourses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ratingcourses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ratingcourses_id_seq OWNER TO postgres;

--
-- TOC entry 3628 (class 0 OID 0)
-- Dependencies: 221
-- Name: ratingcourses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ratingcourses_id_seq OWNED BY public.ratingcourses.id;


--
-- TOC entry 222 (class 1259 OID 16422)
-- Name: students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.students (
    id integer NOT NULL,
    studnumber integer NOT NULL,
    fullname character varying(70) NOT NULL,
    state character varying(15) NOT NULL,
    educationgroup character varying(10) NOT NULL,
    institute character varying(7) NOT NULL,
    sad boolean NOT NULL,
    vacation boolean NOT NULL,
    free boolean NOT NULL
);


ALTER TABLE public.students OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16425)
-- Name: students_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.students_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.students_id_seq OWNER TO postgres;

--
-- TOC entry 3629 (class 0 OID 0)
-- Dependencies: 223
-- Name: students_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.students_id_seq OWNED BY public.students.id;


--
-- TOC entry 224 (class 1259 OID 16426)
-- Name: studentsfree; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.studentsfree (
    id integer NOT NULL,
    studnumber integer NOT NULL,
    dateid bigint NOT NULL
);


ALTER TABLE public.studentsfree OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16429)
-- Name: studentsfree_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.studentsfree_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.studentsfree_id_seq OWNER TO postgres;

--
-- TOC entry 3630 (class 0 OID 0)
-- Dependencies: 225
-- Name: studentsfree_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.studentsfree_id_seq OWNED BY public.studentsfree.id;


--
-- TOC entry 226 (class 1259 OID 16430)
-- Name: studentsfree_studnumber_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.studentsfree_studnumber_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.studentsfree_studnumber_seq OWNER TO postgres;

--
-- TOC entry 3631 (class 0 OID 0)
-- Dependencies: 226
-- Name: studentsfree_studnumber_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.studentsfree_studnumber_seq OWNED BY public.studentsfree.studnumber;


--
-- TOC entry 227 (class 1259 OID 16431)
-- Name: studentsrating; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.studentsrating (
    id integer NOT NULL,
    studentid bigint NOT NULL,
    reatingid bigint NOT NULL,
    dateid bigint NOT NULL,
    destination boolean NOT NULL,
    cause character varying(20)
);


ALTER TABLE public.studentsrating OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16434)
-- Name: studentsrating_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.studentsrating_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.studentsrating_id_seq OWNER TO postgres;

--
-- TOC entry 3632 (class 0 OID 0)
-- Dependencies: 228
-- Name: studentsrating_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.studentsrating_id_seq OWNED BY public.studentsrating.id;


--
-- TOC entry 229 (class 1259 OID 16435)
-- Name: studentssad; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.studentssad (
    id integer NOT NULL,
    studnumber integer NOT NULL,
    dateid bigint NOT NULL
);


ALTER TABLE public.studentssad OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 16438)
-- Name: studentssad_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.studentssad_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.studentssad_id_seq OWNER TO postgres;

--
-- TOC entry 3633 (class 0 OID 0)
-- Dependencies: 230
-- Name: studentssad_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.studentssad_id_seq OWNED BY public.studentssad.id;


--
-- TOC entry 231 (class 1259 OID 16439)
-- Name: studentsvacation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.studentsvacation (
    id integer NOT NULL,
    studnumber integer NOT NULL,
    dateid bigint NOT NULL
);


ALTER TABLE public.studentsvacation OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 16442)
-- Name: studentsvacation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.studentsvacation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.studentsvacation_id_seq OWNER TO postgres;

--
-- TOC entry 3634 (class 0 OID 0)
-- Dependencies: 232
-- Name: studentsvacation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.studentsvacation_id_seq OWNED BY public.studentsvacation.id;


--
-- TOC entry 3220 (class 2604 OID 16443)
-- Name: courselevels id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courselevels ALTER COLUMN id SET DEFAULT nextval('public.courselevels_id_seq'::regclass);


--
-- TOC entry 3221 (class 2604 OID 16444)
-- Name: courses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses ALTER COLUMN id SET DEFAULT nextval('public.courses_id_seq'::regclass);


--
-- TOC entry 3222 (class 2604 OID 16445)
-- Name: datetable id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.datetable ALTER COLUMN id SET DEFAULT nextval('public.datetable_id_seq'::regclass);


--
-- TOC entry 3223 (class 2604 OID 16446)
-- Name: rating id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rating ALTER COLUMN id SET DEFAULT nextval('public.rating_id_seq'::regclass);


--
-- TOC entry 3224 (class 2604 OID 16447)
-- Name: ratingcount id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratingcount ALTER COLUMN id SET DEFAULT nextval('public.ratingcount_id_seq'::regclass);


--
-- TOC entry 3225 (class 2604 OID 16448)
-- Name: ratingcount dateid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratingcount ALTER COLUMN dateid SET DEFAULT nextval('public.ratingcount_dateid_seq'::regclass);


--
-- TOC entry 3226 (class 2604 OID 16449)
-- Name: ratingcourses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratingcourses ALTER COLUMN id SET DEFAULT nextval('public.ratingcourses_id_seq'::regclass);


--
-- TOC entry 3227 (class 2604 OID 16450)
-- Name: students id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students ALTER COLUMN id SET DEFAULT nextval('public.students_id_seq'::regclass);


--
-- TOC entry 3228 (class 2604 OID 16451)
-- Name: studentsfree id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.studentsfree ALTER COLUMN id SET DEFAULT nextval('public.studentsfree_id_seq'::regclass);


--
-- TOC entry 3229 (class 2604 OID 16452)
-- Name: studentsrating id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.studentsrating ALTER COLUMN id SET DEFAULT nextval('public.studentsrating_id_seq'::regclass);


--
-- TOC entry 3230 (class 2604 OID 16453)
-- Name: studentssad id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.studentssad ALTER COLUMN id SET DEFAULT nextval('public.studentssad_id_seq'::regclass);


--
-- TOC entry 3231 (class 2604 OID 16454)
-- Name: studentsvacation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.studentsvacation ALTER COLUMN id SET DEFAULT nextval('public.studentsvacation_id_seq'::regclass);


--
-- TOC entry 3616 (class 0 OID 34845)
-- Dependencies: 233
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" (email, username, password, date) FROM stdin;
user@mail.com	root	$2b$10$uhIX0rJmrqqF6h6oYaUWgeCk9n6s/GsJ04qcX5eyYRHVkpPNugEeq	2022-10-20 21:08:15.633+08
\.


--
-- TOC entry 3592 (class 0 OID 16395)
-- Dependencies: 209
-- Data for Name: courselevels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.courselevels (id, level) FROM stdin;
1	0
2	1
3	2
4	3
\.


--
-- TOC entry 3594 (class 0 OID 16399)
-- Dependencies: 211
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.courses (id, title) FROM stdin;
1	НИД
2	УД
3	СД
4	КТД
5	ОД
\.


--
-- TOC entry 3596 (class 0 OID 16403)
-- Dependencies: 213
-- Data for Name: datetable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.datetable (id, date) FROM stdin;
\.


--
-- TOC entry 3598 (class 0 OID 16409)
-- Dependencies: 215
-- Data for Name: rating; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rating (id, points, ratingcoursesid) FROM stdin;
\.


--
-- TOC entry 3600 (class 0 OID 16413)
-- Dependencies: 217
-- Data for Name: ratingcount; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ratingcount (id, courseid, count, dateid) FROM stdin;
\.


--
-- TOC entry 3603 (class 0 OID 16418)
-- Dependencies: 220
-- Data for Name: ratingcourses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ratingcourses (id, courseid, levelid) FROM stdin;
1	1	2
3	1	4
4	2	1
5	3	1
6	4	1
7	5	1
2	1	3
\.


--
-- TOC entry 3605 (class 0 OID 16422)
-- Dependencies: 222
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.students (id, studnumber, fullname, state, educationgroup, institute, sad, vacation, free) FROM stdin;
\.


--
-- TOC entry 3607 (class 0 OID 16426)
-- Dependencies: 224
-- Data for Name: studentsfree; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.studentsfree (id, studnumber, dateid) FROM stdin;
\.


--
-- TOC entry 3610 (class 0 OID 16431)
-- Dependencies: 227
-- Data for Name: studentsrating; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.studentsrating (id, studentid, reatingid, dateid, destination, cause) FROM stdin;
\.


--
-- TOC entry 3612 (class 0 OID 16435)
-- Dependencies: 229
-- Data for Name: studentssad; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.studentssad (id, studnumber, dateid) FROM stdin;
\.


--
-- TOC entry 3614 (class 0 OID 16439)
-- Dependencies: 231
-- Data for Name: studentsvacation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.studentsvacation (id, studnumber, dateid) FROM stdin;
\.


--
-- TOC entry 3635 (class 0 OID 0)
-- Dependencies: 210
-- Name: courselevels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.courselevels_id_seq', 4, true);


--
-- TOC entry 3636 (class 0 OID 0)
-- Dependencies: 212
-- Name: courses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.courses_id_seq', 5, true);


--
-- TOC entry 3637 (class 0 OID 0)
-- Dependencies: 214
-- Name: datetable_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.datetable_id_seq', 1, false);


--
-- TOC entry 3638 (class 0 OID 0)
-- Dependencies: 216
-- Name: rating_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rating_id_seq', 2, true);


--
-- TOC entry 3639 (class 0 OID 0)
-- Dependencies: 218
-- Name: ratingcount_dateid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ratingcount_dateid_seq', 1, false);


--
-- TOC entry 3640 (class 0 OID 0)
-- Dependencies: 219
-- Name: ratingcount_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ratingcount_id_seq', 1, false);


--
-- TOC entry 3641 (class 0 OID 0)
-- Dependencies: 221
-- Name: ratingcourses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ratingcourses_id_seq', 7, true);


--
-- TOC entry 3642 (class 0 OID 0)
-- Dependencies: 223
-- Name: students_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.students_id_seq', 1, true);


--
-- TOC entry 3643 (class 0 OID 0)
-- Dependencies: 225
-- Name: studentsfree_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.studentsfree_id_seq', 1, false);


--
-- TOC entry 3644 (class 0 OID 0)
-- Dependencies: 226
-- Name: studentsfree_studnumber_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.studentsfree_studnumber_seq', 1, false);


--
-- TOC entry 3645 (class 0 OID 0)
-- Dependencies: 228
-- Name: studentsrating_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.studentsrating_id_seq', 1, false);


--
-- TOC entry 3646 (class 0 OID 0)
-- Dependencies: 230
-- Name: studentssad_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.studentssad_id_seq', 1, false);


--
-- TOC entry 3647 (class 0 OID 0)
-- Dependencies: 232
-- Name: studentsvacation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.studentsvacation_id_seq', 1, false);


--
-- TOC entry 3387 (class 2606 OID 34851)
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (email);


--
-- TOC entry 3389 (class 2606 OID 39702)
-- Name: Users Users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key" UNIQUE (username);


--
-- TOC entry 3391 (class 2606 OID 39704)
-- Name: Users Users_username_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key1" UNIQUE (username);


--
-- TOC entry 3393 (class 2606 OID 39698)
-- Name: Users Users_username_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key10" UNIQUE (username);


--
-- TOC entry 3395 (class 2606 OID 39720)
-- Name: Users Users_username_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key11" UNIQUE (username);


--
-- TOC entry 3397 (class 2606 OID 39722)
-- Name: Users Users_username_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key12" UNIQUE (username);


--
-- TOC entry 3399 (class 2606 OID 39696)
-- Name: Users Users_username_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key13" UNIQUE (username);


--
-- TOC entry 3401 (class 2606 OID 39694)
-- Name: Users Users_username_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key14" UNIQUE (username);


--
-- TOC entry 3403 (class 2606 OID 39724)
-- Name: Users Users_username_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key15" UNIQUE (username);


--
-- TOC entry 3405 (class 2606 OID 39726)
-- Name: Users Users_username_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key16" UNIQUE (username);


--
-- TOC entry 3407 (class 2606 OID 39692)
-- Name: Users Users_username_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key17" UNIQUE (username);


--
-- TOC entry 3409 (class 2606 OID 39728)
-- Name: Users Users_username_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key18" UNIQUE (username);


--
-- TOC entry 3411 (class 2606 OID 39730)
-- Name: Users Users_username_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key19" UNIQUE (username);


--
-- TOC entry 3413 (class 2606 OID 39706)
-- Name: Users Users_username_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key2" UNIQUE (username);


--
-- TOC entry 3415 (class 2606 OID 39732)
-- Name: Users Users_username_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key20" UNIQUE (username);


--
-- TOC entry 3417 (class 2606 OID 39734)
-- Name: Users Users_username_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key21" UNIQUE (username);


--
-- TOC entry 3419 (class 2606 OID 39736)
-- Name: Users Users_username_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key22" UNIQUE (username);


--
-- TOC entry 3421 (class 2606 OID 39690)
-- Name: Users Users_username_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key23" UNIQUE (username);


--
-- TOC entry 3423 (class 2606 OID 39738)
-- Name: Users Users_username_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key24" UNIQUE (username);


--
-- TOC entry 3425 (class 2606 OID 39740)
-- Name: Users Users_username_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key25" UNIQUE (username);


--
-- TOC entry 3427 (class 2606 OID 39742)
-- Name: Users Users_username_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key26" UNIQUE (username);


--
-- TOC entry 3429 (class 2606 OID 39708)
-- Name: Users Users_username_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key3" UNIQUE (username);


--
-- TOC entry 3431 (class 2606 OID 39700)
-- Name: Users Users_username_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key4" UNIQUE (username);


--
-- TOC entry 3433 (class 2606 OID 39710)
-- Name: Users Users_username_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key5" UNIQUE (username);


--
-- TOC entry 3435 (class 2606 OID 39712)
-- Name: Users Users_username_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key6" UNIQUE (username);


--
-- TOC entry 3437 (class 2606 OID 39714)
-- Name: Users Users_username_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key7" UNIQUE (username);


--
-- TOC entry 3439 (class 2606 OID 39716)
-- Name: Users Users_username_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key8" UNIQUE (username);


--
-- TOC entry 3441 (class 2606 OID 39718)
-- Name: Users Users_username_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key9" UNIQUE (username);


--
-- TOC entry 3233 (class 2606 OID 16456)
-- Name: courselevels courselevels_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courselevels
    ADD CONSTRAINT courselevels_pk PRIMARY KEY (id);


--
-- TOC entry 3235 (class 2606 OID 16458)
-- Name: courses courses_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pk PRIMARY KEY (id);


--
-- TOC entry 3237 (class 2606 OID 16460)
-- Name: datetable datetable_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.datetable
    ADD CONSTRAINT datetable_pk PRIMARY KEY (id);


--
-- TOC entry 3239 (class 2606 OID 16462)
-- Name: rating rating_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT rating_pk PRIMARY KEY (id);


--
-- TOC entry 3241 (class 2606 OID 16464)
-- Name: ratingcount ratingcount_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratingcount
    ADD CONSTRAINT ratingcount_pk PRIMARY KEY (id);


--
-- TOC entry 3243 (class 2606 OID 16466)
-- Name: ratingcourses ratingcourses_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratingcourses
    ADD CONSTRAINT ratingcourses_pk PRIMARY KEY (id);


--
-- TOC entry 3245 (class 2606 OID 16468)
-- Name: students students_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pk PRIMARY KEY (id);


--
-- TOC entry 3247 (class 2606 OID 39836)
-- Name: students students_studnumber_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key UNIQUE (studnumber);


--
-- TOC entry 3249 (class 2606 OID 39838)
-- Name: students students_studnumber_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key1 UNIQUE (studnumber);


--
-- TOC entry 3251 (class 2606 OID 39878)
-- Name: students students_studnumber_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key10 UNIQUE (studnumber);


--
-- TOC entry 3253 (class 2606 OID 39880)
-- Name: students students_studnumber_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key11 UNIQUE (studnumber);


--
-- TOC entry 3255 (class 2606 OID 39882)
-- Name: students students_studnumber_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key12 UNIQUE (studnumber);


--
-- TOC entry 3257 (class 2606 OID 39884)
-- Name: students students_studnumber_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key13 UNIQUE (studnumber);


--
-- TOC entry 3259 (class 2606 OID 39886)
-- Name: students students_studnumber_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key14 UNIQUE (studnumber);


--
-- TOC entry 3261 (class 2606 OID 39888)
-- Name: students students_studnumber_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key15 UNIQUE (studnumber);


--
-- TOC entry 3263 (class 2606 OID 39890)
-- Name: students students_studnumber_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key16 UNIQUE (studnumber);


--
-- TOC entry 3265 (class 2606 OID 39892)
-- Name: students students_studnumber_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key17 UNIQUE (studnumber);


--
-- TOC entry 3267 (class 2606 OID 39894)
-- Name: students students_studnumber_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key18 UNIQUE (studnumber);


--
-- TOC entry 3269 (class 2606 OID 39806)
-- Name: students students_studnumber_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key19 UNIQUE (studnumber);


--
-- TOC entry 3271 (class 2606 OID 39840)
-- Name: students students_studnumber_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key2 UNIQUE (studnumber);


--
-- TOC entry 3273 (class 2606 OID 39834)
-- Name: students students_studnumber_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key20 UNIQUE (studnumber);


--
-- TOC entry 3275 (class 2606 OID 39808)
-- Name: students students_studnumber_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key21 UNIQUE (studnumber);


--
-- TOC entry 3277 (class 2606 OID 39810)
-- Name: students students_studnumber_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key22 UNIQUE (studnumber);


--
-- TOC entry 3279 (class 2606 OID 39816)
-- Name: students students_studnumber_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key23 UNIQUE (studnumber);


--
-- TOC entry 3281 (class 2606 OID 39818)
-- Name: students students_studnumber_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key24 UNIQUE (studnumber);


--
-- TOC entry 3283 (class 2606 OID 39828)
-- Name: students students_studnumber_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key25 UNIQUE (studnumber);


--
-- TOC entry 3285 (class 2606 OID 39820)
-- Name: students students_studnumber_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key26 UNIQUE (studnumber);


--
-- TOC entry 3287 (class 2606 OID 39822)
-- Name: students students_studnumber_key27; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key27 UNIQUE (studnumber);


--
-- TOC entry 3289 (class 2606 OID 39824)
-- Name: students students_studnumber_key28; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key28 UNIQUE (studnumber);


--
-- TOC entry 3291 (class 2606 OID 39826)
-- Name: students students_studnumber_key29; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key29 UNIQUE (studnumber);


--
-- TOC entry 3293 (class 2606 OID 39842)
-- Name: students students_studnumber_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key3 UNIQUE (studnumber);


--
-- TOC entry 3295 (class 2606 OID 39812)
-- Name: students students_studnumber_key30; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key30 UNIQUE (studnumber);


--
-- TOC entry 3297 (class 2606 OID 39814)
-- Name: students students_studnumber_key31; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key31 UNIQUE (studnumber);


--
-- TOC entry 3299 (class 2606 OID 39870)
-- Name: students students_studnumber_key32; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key32 UNIQUE (studnumber);


--
-- TOC entry 3301 (class 2606 OID 39868)
-- Name: students students_studnumber_key33; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key33 UNIQUE (studnumber);


--
-- TOC entry 3303 (class 2606 OID 39830)
-- Name: students students_studnumber_key34; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key34 UNIQUE (studnumber);


--
-- TOC entry 3305 (class 2606 OID 39832)
-- Name: students students_studnumber_key35; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key35 UNIQUE (studnumber);


--
-- TOC entry 3307 (class 2606 OID 39896)
-- Name: students students_studnumber_key36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key36 UNIQUE (studnumber);


--
-- TOC entry 3309 (class 2606 OID 39898)
-- Name: students students_studnumber_key37; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key37 UNIQUE (studnumber);


--
-- TOC entry 3311 (class 2606 OID 39900)
-- Name: students students_studnumber_key38; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key38 UNIQUE (studnumber);


--
-- TOC entry 3313 (class 2606 OID 39902)
-- Name: students students_studnumber_key39; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key39 UNIQUE (studnumber);


--
-- TOC entry 3315 (class 2606 OID 39862)
-- Name: students students_studnumber_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key4 UNIQUE (studnumber);


--
-- TOC entry 3317 (class 2606 OID 39904)
-- Name: students students_studnumber_key40; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key40 UNIQUE (studnumber);


--
-- TOC entry 3319 (class 2606 OID 39788)
-- Name: students students_studnumber_key41; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key41 UNIQUE (studnumber);


--
-- TOC entry 3321 (class 2606 OID 39790)
-- Name: students students_studnumber_key42; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key42 UNIQUE (studnumber);


--
-- TOC entry 3323 (class 2606 OID 39804)
-- Name: students students_studnumber_key43; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key43 UNIQUE (studnumber);


--
-- TOC entry 3325 (class 2606 OID 39792)
-- Name: students students_studnumber_key44; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key44 UNIQUE (studnumber);


--
-- TOC entry 3327 (class 2606 OID 39794)
-- Name: students students_studnumber_key45; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key45 UNIQUE (studnumber);


--
-- TOC entry 3329 (class 2606 OID 39796)
-- Name: students students_studnumber_key46; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key46 UNIQUE (studnumber);


--
-- TOC entry 3331 (class 2606 OID 39798)
-- Name: students students_studnumber_key47; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key47 UNIQUE (studnumber);


--
-- TOC entry 3333 (class 2606 OID 39800)
-- Name: students students_studnumber_key48; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key48 UNIQUE (studnumber);


--
-- TOC entry 3335 (class 2606 OID 39802)
-- Name: students students_studnumber_key49; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key49 UNIQUE (studnumber);


--
-- TOC entry 3337 (class 2606 OID 39864)
-- Name: students students_studnumber_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key5 UNIQUE (studnumber);


--
-- TOC entry 3339 (class 2606 OID 39844)
-- Name: students students_studnumber_key50; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key50 UNIQUE (studnumber);


--
-- TOC entry 3341 (class 2606 OID 39846)
-- Name: students students_studnumber_key51; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key51 UNIQUE (studnumber);


--
-- TOC entry 3343 (class 2606 OID 39860)
-- Name: students students_studnumber_key52; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key52 UNIQUE (studnumber);


--
-- TOC entry 3345 (class 2606 OID 39858)
-- Name: students students_studnumber_key53; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key53 UNIQUE (studnumber);


--
-- TOC entry 3347 (class 2606 OID 39848)
-- Name: students students_studnumber_key54; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key54 UNIQUE (studnumber);


--
-- TOC entry 3349 (class 2606 OID 39850)
-- Name: students students_studnumber_key55; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key55 UNIQUE (studnumber);


--
-- TOC entry 3351 (class 2606 OID 39856)
-- Name: students students_studnumber_key56; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key56 UNIQUE (studnumber);


--
-- TOC entry 3353 (class 2606 OID 39852)
-- Name: students students_studnumber_key57; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key57 UNIQUE (studnumber);


--
-- TOC entry 3355 (class 2606 OID 39854)
-- Name: students students_studnumber_key58; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key58 UNIQUE (studnumber);


--
-- TOC entry 3357 (class 2606 OID 39906)
-- Name: students students_studnumber_key59; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key59 UNIQUE (studnumber);


--
-- TOC entry 3359 (class 2606 OID 39866)
-- Name: students students_studnumber_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key6 UNIQUE (studnumber);


--
-- TOC entry 3361 (class 2606 OID 39908)
-- Name: students students_studnumber_key60; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key60 UNIQUE (studnumber);


--
-- TOC entry 3363 (class 2606 OID 39910)
-- Name: students students_studnumber_key61; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key61 UNIQUE (studnumber);


--
-- TOC entry 3365 (class 2606 OID 39786)
-- Name: students students_studnumber_key62; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key62 UNIQUE (studnumber);


--
-- TOC entry 3367 (class 2606 OID 39912)
-- Name: students students_studnumber_key63; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key63 UNIQUE (studnumber);


--
-- TOC entry 3369 (class 2606 OID 39914)
-- Name: students students_studnumber_key64; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key64 UNIQUE (studnumber);


--
-- TOC entry 3371 (class 2606 OID 39916)
-- Name: students students_studnumber_key65; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key65 UNIQUE (studnumber);


--
-- TOC entry 3373 (class 2606 OID 39872)
-- Name: students students_studnumber_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key7 UNIQUE (studnumber);


--
-- TOC entry 3375 (class 2606 OID 39874)
-- Name: students students_studnumber_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key8 UNIQUE (studnumber);


--
-- TOC entry 3377 (class 2606 OID 39876)
-- Name: students students_studnumber_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_studnumber_key9 UNIQUE (studnumber);


--
-- TOC entry 3379 (class 2606 OID 16474)
-- Name: studentsfree studentsfree_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.studentsfree
    ADD CONSTRAINT studentsfree_pk PRIMARY KEY (id);


--
-- TOC entry 3381 (class 2606 OID 16476)
-- Name: studentsrating studentsrating_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.studentsrating
    ADD CONSTRAINT studentsrating_pk PRIMARY KEY (id);


--
-- TOC entry 3383 (class 2606 OID 16478)
-- Name: studentssad studentssad_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.studentssad
    ADD CONSTRAINT studentssad_pk PRIMARY KEY (id);


--
-- TOC entry 3385 (class 2606 OID 16480)
-- Name: studentsvacation studentsvacation_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.studentsvacation
    ADD CONSTRAINT studentsvacation_pk PRIMARY KEY (id);


--
-- TOC entry 3442 (class 2606 OID 39778)
-- Name: rating rating_ratingcoursesid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT rating_ratingcoursesid_fkey FOREIGN KEY (ratingcoursesid) REFERENCES public.ratingcourses(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3443 (class 2606 OID 39753)
-- Name: ratingcount ratingcount_courseid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratingcount
    ADD CONSTRAINT ratingcount_courseid_fkey FOREIGN KEY (courseid) REFERENCES public.courses(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3444 (class 2606 OID 39758)
-- Name: ratingcount ratingcount_dateid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratingcount
    ADD CONSTRAINT ratingcount_dateid_fkey FOREIGN KEY (dateid) REFERENCES public.datetable(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3445 (class 2606 OID 39743)
-- Name: ratingcourses ratingcourses_courseid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratingcourses
    ADD CONSTRAINT ratingcourses_courseid_fkey FOREIGN KEY (courseid) REFERENCES public.courses(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3446 (class 2606 OID 39748)
-- Name: ratingcourses ratingcourses_levelid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratingcourses
    ADD CONSTRAINT ratingcourses_levelid_fkey FOREIGN KEY (levelid) REFERENCES public.courselevels(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3447 (class 2606 OID 39773)
-- Name: studentsfree studentsfree_dateid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.studentsfree
    ADD CONSTRAINT studentsfree_dateid_fkey FOREIGN KEY (dateid) REFERENCES public.datetable(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3449 (class 2606 OID 39682)
-- Name: studentsrating studentsrating_dateid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.studentsrating
    ADD CONSTRAINT studentsrating_dateid_fkey FOREIGN KEY (dateid) REFERENCES public.datetable(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3448 (class 2606 OID 39677)
-- Name: studentsrating studentsrating_reatingid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.studentsrating
    ADD CONSTRAINT studentsrating_reatingid_fkey FOREIGN KEY (reatingid) REFERENCES public.rating(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3450 (class 2606 OID 39917)
-- Name: studentsrating studentsrating_studentid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.studentsrating
    ADD CONSTRAINT studentsrating_studentid_fkey FOREIGN KEY (studentid) REFERENCES public.students(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3451 (class 2606 OID 39763)
-- Name: studentssad studentssad_dateid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.studentssad
    ADD CONSTRAINT studentssad_dateid_fkey FOREIGN KEY (dateid) REFERENCES public.datetable(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3452 (class 2606 OID 39768)
-- Name: studentsvacation studentsvacation_dateid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.studentsvacation
    ADD CONSTRAINT studentsvacation_dateid_fkey FOREIGN KEY (dateid) REFERENCES public.datetable(id) ON UPDATE CASCADE ON DELETE SET NULL;


-- Completed on 2022-10-17 18:00:13

--
-- PostgreSQL database dump complete
--

