create sequence donors_donor_id_seq
    as integer;

alter sequence donors_donor_id_seq owner to postgres;

create table donors
(
    donor_id      serial
        primary key,
    first_name    varchar(50),
    last_name     varchar(50),
    email         varchar(100)
        unique,
    phone         varchar(20),
    blood_type    varchar(3),
    date_of_birth date,
    created_at    timestamp default CURRENT_TIMESTAMP
);

alter table donors
    owner to postgres;

create index idx_donors_blood_type
    on donors (blood_type);

create table recipients
(
    recipient_id      serial
        primary key,
    first_name        varchar(50),
    last_name         varchar(50),
    email             varchar(100),
    phone             varchar(20),
    blood_type_needed varchar(3),
    request_date      date not null,
    created_at        timestamp default CURRENT_TIMESTAMP
);

alter table recipients
    owner to postgres;

create index idx_recipients_blood_type
    on recipients (blood_type_needed);

create table appointments
(
    appointment_id   serial
        primary key,
    donor_id         integer
        references donors
            on delete cascade,
    appointment_date timestamp not null,
    status           varchar(20) default 'Scheduled'::character varying,
    created_at       timestamp   default CURRENT_TIMESTAMP
);

alter table appointments
    owner to postgres;

create table donations
(
    donation_id   serial
        primary key,
    donor_id      integer
        references donors
            on delete cascade,
    donation_date date not null,
    blood_type    varchar(3),
    volume_ml     integer,
    created_at    timestamp default CURRENT_TIMESTAMP
);

alter table donations
    owner to postgres;

