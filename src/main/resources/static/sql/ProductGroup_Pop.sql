--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.3
-- Dumped by pg_dump version 12.0

-- Started on 2020-01-03 09:09:45 EST

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

--
-- TOC entry 2394 (class 0 OID 29790)
-- Dependencies: 186
-- Data for Name: product_group; Type: TABLE DATA; Schema: public; Owner: maxar_usr
--

INSERT INTO public.product_group VALUES (89, 'AccessMidstream');
INSERT INTO public.product_group VALUES (90, 'Aera Energy');
INSERT INTO public.product_group VALUES (91, 'Alyeska');
INSERT INTO public.product_group VALUES (92, 'Apache Corporation');
INSERT INTO public.product_group VALUES (93, 'Australian Foundation');
INSERT INTO public.product_group VALUES (94, 'Chesapeake Energy');
INSERT INTO public.product_group VALUES (95, 'Conoco');
INSERT INTO public.product_group VALUES (96, 'Denbury Resources');
INSERT INTO public.product_group VALUES (97, 'DigitalGlobe Demo');
INSERT INTO public.product_group VALUES (98, 'DigitalGlobe Fee');
INSERT INTO public.product_group VALUES (99, 'DigitalGlobe Foundation');
INSERT INTO public.product_group VALUES (100, 'DigitalGlobe LiDAR');
INSERT INTO public.product_group VALUES (101, 'Eagleford Basin');
INSERT INTO public.product_group VALUES (102, 'EOG');
INSERT INTO public.product_group VALUES (103, 'Exxon Mobil');
INSERT INTO public.product_group VALUES (104, 'Exxon Mobil Contractor');
INSERT INTO public.product_group VALUES (105, 'Fayetteville Basin');
INSERT INTO public.product_group VALUES (106, 'Hilcorp');
INSERT INTO public.product_group VALUES (107, 'Kinder Morgan');
INSERT INTO public.product_group VALUES (108, 'Noble');
INSERT INTO public.product_group VALUES (109, 'NREL');
INSERT INTO public.product_group VALUES (110, 'PDO');
INSERT INTO public.product_group VALUES (111, 'PDO Source Data');
INSERT INTO public.product_group VALUES (112, 'Pioneer Resources');
INSERT INTO public.product_group VALUES (113, 'Range Resources');
INSERT INTO public.product_group VALUES (114, 'Shell Americas');
INSERT INTO public.product_group VALUES (115, 'Shell Canada');
INSERT INTO public.product_group VALUES (116, 'Shell Canada UAS');
INSERT INTO public.product_group VALUES (117, 'Shell Global');
INSERT INTO public.product_group VALUES (118, 'Shell Global Source Data');
INSERT INTO public.product_group VALUES (119, 'Shell Iraq');
INSERT INTO public.product_group VALUES (120, 'Shell Netherlands');
INSERT INTO public.product_group VALUES (121, 'Shell Nigeria');
INSERT INTO public.product_group VALUES (122, 'Shell Nigeria ERM');
INSERT INTO public.product_group VALUES (123, 'Shell Oman');
INSERT INTO public.product_group VALUES (124, 'Shell Qatar');
INSERT INTO public.product_group VALUES (125, 'Shell SIEP');
INSERT INTO public.product_group VALUES (126, 'Shell TCarta');
INSERT INTO public.product_group VALUES (127, 'Shell US');
INSERT INTO public.product_group VALUES (128, 'South American Foundation');
INSERT INTO public.product_group VALUES (129, 'Southwestern Energy');
INSERT INTO public.product_group VALUES (130, 'Statoil');
INSERT INTO public.product_group VALUES (131, 'Suncor');
INSERT INTO public.product_group VALUES (132, 'Suncor Historical Aerial');
INSERT INTO public.product_group VALUES (133, 'Suncor OS Monitoring');
INSERT INTO public.product_group VALUES (134, 'Williams Energy');


--
-- TOC entry 2402 (class 0 OID 0)
-- Dependencies: 185
-- Name: product_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: maxar_usr
--

SELECT pg_catalog.setval('public.product_group_id_seq', 134, true);


-- Completed on 2020-01-03 09:09:45 EST

--
-- PostgreSQL database dump complete
--

