CREATE TABLE IF NOT EXISTS public.roles (id serial NOT NULL,
                                                   name character varying(255) COLLATE pg_catalog."default" NOT NULL,
                                                                                                            "createdAt" timestamp with time zone NOT NULL,
                                                                                                                                                 "updatedAt" timestamp with time zone NOT NULL,
                                                                                                                                                                                      CONSTRAINT roles_pkey PRIMARY KEY (id), CONSTRAINT roles_name_key UNIQUE (name)) TABLESPACE pg_default;


ALTER TABLE IF EXISTS public.roles OWNER to postgres;

GRANT ALL ON TABLE public.roles TO pg_database_owner;

GRANT ALL ON TABLE public.roles TO postgres;


delete
from public.roles *;


insert into roles (id,
                   name,
                   "createdAt",
                   "updatedAt")
values (1,
        'ADMIN',
        '2003-01-01',
        '2003-01-01');


insert into roles (id,
                   name,
                   "createdAt",
                   "updatedAt")
values (2,
        'USER',
        '2002-01-01',
        '2002-01-01');


CREATE TABLE IF NOT EXISTS public.users (id serial NOT NULL,
                                                   email character varying(255) COLLATE pg_catalog."default" NOT NULL,
                                                                                                             password character varying(255) COLLATE pg_catalog."default" NOT NULL,
                                                                                                                                                                          fio character varying(255) COLLATE pg_catalog."default" NOT NULL,
                                                                                                                                                                                                                                  "createdAt" timestamp with time zone NOT NULL,
                                                                                                                                                                                                                                                                       "updatedAt" timestamp with time zone NOT NULL,
                                                                                                                                                                                                                                                                                                            CONSTRAINT users_pkey PRIMARY KEY (id), CONSTRAINT users_email_key UNIQUE (email)) TABLESPACE pg_default;


ALTER TABLE IF EXISTS public.users OWNER to postgres;

GRANT ALL ON TABLE public.users TO pg_database_owner;

GRANT ALL ON TABLE public.users TO postgres;


delete
from public.users *;

--пароль везде 'password'

insert into users (id, email, password, fio, "createdAt", "updatedAt")
values (1,
        'admin1@mail.ru',
        '$2a$05$8X.GLqnWK2ox1tvi/oTbseyCQ7hsErqZ4Np/59BH/uRi7oliQpqCG',
        'ФИО админ 1',
        '2003-01-01',
        '2003-01-01');


insert into users (id, email, password, fio, "createdAt", "updatedAt")
values (2,
        'admin2@mail.ru',
        '$2a$05$kMsQNowEyfSa3gbv4zqTjepB0YSKBsIYlZnmMqUwzikxlEm3I9EXK',
        'fio admin 2',
        '2004-01-01',
        '2004-01-01');


insert into users (id, email, password, fio, "createdAt", "updatedAt")
values (3,
        'user1AndAdmin3@mail.ru',
        '$2a$05$2W1hVe3V1gaDHLxtlGGsYuazbNaorgjeA0wF4v6QUuTp6y2YhLGtq',
        'fio user 1',
        '2005-01-01',
        '2005-01-01');


insert into users (id, email, password, fio, "createdAt", "updatedAt")
values (4,
        'user2@mail.ru',
        '$2a$05$nzbY1qRegIUxeRKqYRAH2OgtNKA02idVnpo5hO7TVAA4a0slW5GCC',
        'fio user 2',
        '2006-01-01',
        '2006-01-01');


insert into users (id, email, password, fio, "createdAt", "updatedAt")
values (5,
        'user3@mail.ru',
        '$2a$05$HLaA10borjRT8RxChzV/U.yDzGE0tSI34v4Elx2EgYq8RyzOzC6Hy',
        'fio user 3',
        '2007-01-01',
        '2007-01-01');


insert into users (id, email, password, fio, "createdAt", "updatedAt")
values (6,
        'user4@mail.ru',
        '$2a$05$p4nAugzPKITOXly7ue.8qujUr7A9B4VaZUG/p54gaBb//z9Rjln5i',
        'fio user 4',
        '2008-01-01',
        '2008-01-01');


insert into users (id, email, password, fio, "createdAt", "updatedAt")
values (7,
        'user5@mail.ru',
        '$2a$05$p4nAugzPKITOXly7ue.8qujUr7A9B4VaZUG/p54gaBb//z9Rjln5i',
        'fio user 5',
        '2009-01-01',
        '2009-01-01');


CREATE TABLE IF NOT EXISTS public.meetup
        (id serial NOT NULL,
                   name character varying(255) COLLATE pg_catalog."default" NOT NULL,
                                                                            description character varying(255) COLLATE pg_catalog."default",
                                                                                                                       location character varying(255) COLLATE pg_catalog."default",
                                                                                                                                                               target_audience character varying(255) COLLATE pg_catalog."default",
                                                                                                                                                                                                              need_to_know character varying(255) COLLATE pg_catalog."default",
                                                                                                                                                                                                                                                          will_happen character varying(255) COLLATE pg_catalog."default",
                                                                                                                                                                                                                                                                                                     reason_to_come character varying(255) COLLATE pg_catalog."default",
                                                                                                                                                                                                                                                                                                                                                   "time" timestamp with time zone NOT NULL,
                                                                                                                                                                                                                                                                                                                                                                                   duration integer, "createdBy" integer, "createdAt" timestamp with time zone NOT NULL,
                                                                                                                                                                                                                                                                                                                                                                                                                                                               "updatedAt" timestamp with time zone NOT NULL,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    CONSTRAINT meetup_pkey PRIMARY KEY (id), CONSTRAINT meetup_name_key UNIQUE (name), CONSTRAINT meetup_time_key UNIQUE ("time"), CONSTRAINT "meetup_createdBy_fkey"
         FOREIGN KEY ("createdBy") REFERENCES public.users (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE) TABLESPACE pg_default;


ALTER TABLE IF EXISTS public.meetup OWNER to postgres;

GRANT ALL ON TABLE public.meetup TO pg_database_owner;

GRANT ALL ON TABLE public.meetup TO postgres;


delete
from public.meetup *;


insert into meetup (id, name, description, location, target_audience, need_to_know, will_happen, reason_to_come, "time", "createdBy", "createdAt", "updatedAt")
values (1,
        'meetup1',
        'description of meetup1',
        'переговорная 1',
        'target',
        'need to know',
        'will happen',
        'reason to come',
        '2022-11-11',
        3,
        '2003-01-01',
        '2003-01-01');


insert into meetup (id, name, description, location, target_audience, need_to_know, will_happen, reason_to_come, "time", "createdBy", "createdAt", "updatedAt")
values (2,
        'meetup2',
        'description of meetup2',
        'переговорная 1',
        'target',
        'need to know',
        'will happen',
        'reason to come',
        '2022-12-11',
        3,
        '2003-02-01',
        '2003-02-01');


insert into meetup (id, name, description, location, target_audience, need_to_know, will_happen, reason_to_come, "time", "createdBy", "createdAt", "updatedAt")
values (3,
        'meetup3',
        'description of meetup3',
        'переговорная 1',
        'target',
        'need to know',
        'will happen',
        'reason to come',
        '2022-12-12',
        4,
        '2005-01-01',
        '2005-01-01');


insert into meetup (id, name, description, location, target_audience, need_to_know, will_happen, reason_to_come, "time", "createdBy", "createdAt", "updatedAt")
values (4,
        'meetup4',
        'description of meetup4',
        'переговорная 1',
        'target',
        'need to know',
        'will happen',
        'reason to come',
        '2022-10-10',
        5,
        '2006-01-01',
        '2006-01-01');


insert into meetup (id, name, description, location, target_audience, need_to_know, will_happen, reason_to_come, "time", "createdBy", "createdAt", "updatedAt")
values (5,
        'meetup5',
        'description of meetup5',
        'переговорная 1',
        'target',
        'need to know',
        'will happen',
        'reason to come',
        '2022-09-09',
        6,
        '2008-01-01',
        '2008-01-01');


insert into meetup (id, name, description, location, target_audience, need_to_know, will_happen, reason_to_come, "time", "createdBy", "createdAt", "updatedAt")
values (6,
        'meetup6',
        'description of meetup6',
        'переговорная 1',
        'target',
        'need to know',
        'will happen',
        'reason to come',
        '2022-09-10',
        6,
        '2009-02-01',
        '2009-02-01');


CREATE TABLE IF NOT EXISTS public."user-role" (id serial NOT NULL,
                                                         "userId" integer, "roleId" integer, "createdAt" timestamp with time zone NOT NULL,
                                                                                                                                  "updatedAt" timestamp with time zone NOT NULL,
                                                                                                                                                                       CONSTRAINT "user-role_pkey" PRIMARY KEY (id), CONSTRAINT "user-role_userId_roleId_key" UNIQUE ("userId",
                                                                                                                                                                                                                                                                      "roleId")) TABLESPACE pg_default;


ALTER TABLE IF EXISTS public."user-role" OWNER to postgres;

GRANT ALL ON TABLE public."user-role" TO pg_database_owner;

GRANT ALL ON TABLE public."user-role" TO postgres;


delete
from public."user-role" *;


insert into "user-role" (id,
                         "userId",
                         "roleId",
                         "createdAt",
                         "updatedAt")
values (1,
        1,
        1,
        '2003-01-01',
        '2003-01-01');


insert into "user-role" (id,
                         "userId",
                         "roleId",
                         "createdAt",
                         "updatedAt")
values (2,
        2,
        1,
        '2003-01-01',
        '2003-01-01');


insert into "user-role" (id,
                         "userId",
                         "roleId",
                         "createdAt",
                         "updatedAt")
values (3,
        3,
        2,
        '2003-01-01',
        '2003-01-01');


insert into "user-role" (id,
                         "userId",
                         "roleId",
                         "createdAt",
                         "updatedAt")
values (4,
        3,
        1,
        '2003-01-01',
        '2003-01-01');


insert into "user-role" (id,
                         "userId",
                         "roleId",
                         "createdAt",
                         "updatedAt")
values (5,
        4,
        2,
        '2003-01-01',
        '2003-01-01');


insert into "user-role" (id,
                         "userId",
                         "roleId",
                         "createdAt",
                         "updatedAt")
values (6,
        5,
        2,
        '2003-01-01',
        '2003-01-01');


insert into "user-role" (id,
                         "userId",
                         "roleId",
                         "createdAt",
                         "updatedAt")
values (7,
        6,
        2,
        '2003-01-01',
        '2003-01-01');


insert into "user-role" (id,
                         "userId",
                         "roleId",
                         "createdAt",
                         "updatedAt")
values (8,
        7,
        2,
        '2003-01-01',
        '2003-01-01');


CREATE TABLE IF NOT EXISTS public."user-meetup"
        (id serial NOT NULL,
                   "userId" integer, "meetupId" integer, "createdAt" timestamp with time zone NOT NULL,
                                                                                              "updatedAt" timestamp with time zone NOT NULL,
                                                                                                                                   CONSTRAINT "user-meetup_pkey" PRIMARY KEY (id), CONSTRAINT "user-meetup_userId_meetupId_key" UNIQUE ("userId",
                                                                                                                                                                                                                                        "meetupId"), CONSTRAINT "user-meetup_meetupId_fkey"
         FOREIGN KEY ("meetupId") REFERENCES public.meetup (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE,
                                                                                                         CONSTRAINT "user-meetup_userId_fkey"
         FOREIGN KEY ("userId") REFERENCES public.users (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE) TABLESPACE pg_default;


ALTER TABLE IF EXISTS public."user-meetup" OWNER to postgres;

GRANT ALL ON TABLE public."user-meetup" TO pg_database_owner;

GRANT ALL ON TABLE public."user-meetup" TO postgres;


delete
from public."user-meetup" *;


insert into "user-meetup" (id,
                           "userId",
                           "meetupId",
                           "createdAt",
                           "updatedAt")
values (1,
        3,
        1,
        '2003-01-01',
        '2003-01-01');


insert into "user-meetup" (id,
                           "userId",
                           "meetupId",
                           "createdAt",
                           "updatedAt")
values (2,
        3,
        2,
        '2003-01-01',
        '2003-01-01');


insert into "user-meetup" (id,
                           "userId",
                           "meetupId",
                           "createdAt",
                           "updatedAt")
values (3,
        4,
        1,
        '2003-01-01',
        '2003-01-01');


insert into "user-meetup" (id,
                           "userId",
                           "meetupId",
                           "createdAt",
                           "updatedAt")
values (4,
        4,
        2,
        '2003-01-01',
        '2003-01-01');


insert into "user-meetup" (id,
                           "userId",
                           "meetupId",
                           "createdAt",
                           "updatedAt")
values (5,
        4,
        3,
        '2003-01-01',
        '2003-01-01');


insert into "user-meetup" (id,
                           "userId",
                           "meetupId",
                           "createdAt",
                           "updatedAt")
values (6,
        4,
        4,
        '2003-01-01',
        '2003-01-01');


insert into "user-meetup" (id,
                           "userId",
                           "meetupId",
                           "createdAt",
                           "updatedAt")
values (7,
        5,
        1,
        '2003-01-01',
        '2003-01-01');


insert into "user-meetup" (id,
                           "userId",
                           "meetupId",
                           "createdAt",
                           "updatedAt")
values (8,
        6,
        2,
        '2003-01-01',
        '2003-01-01');


insert into "user-meetup" (id,
                           "userId",
                           "meetupId",
                           "createdAt",
                           "updatedAt")
values (9,
        6,
        5,
        '2003-01-01',
        '2003-01-01');


insert into "user-meetup" (id,
                           "userId",
                           "meetupId",
                           "createdAt",
                           "updatedAt")
values (10,
        6,
        1,
        '2003-01-01',
        '2003-01-01');