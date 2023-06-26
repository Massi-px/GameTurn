create database gameturn;



create table tournament
(
    id                  int auto_increment
        primary key,
    name                varchar(30)  not null,
    start_date          date         not null,
    end_date            date         not null,
    maxNmbrParticipants int          not null,
    game                varchar(100) null
);

create table users
(
    id        int auto_increment
        primary key,
    username  varchar(50)          null,
    lastname  varchar(50)          null,
    firstname varchar(50)          null,
    email     varchar(100)         null,
    password  varchar(100)         null,
    token     varchar(255)         null,
    isActive  tinyint(1) default 0 not null
);

create table matchs
(
    id            int auto_increment
        primary key,
    player1_id    int not null,
    player2_id    int null,
    p1_score_1    int null,
    p1_score_2    int null,
    p2_score_1    int null,
    p2_score_2    int null,
    stage         int null,
    tournament_id int null,
    constraint event_ibfk
        foreign key (tournament_id) references tournament (id),
    constraint matchs_ibfk_2
        foreign key (player1_id) references users (id),
    constraint matchs_ibfk_3
        foreign key (player2_id) references users (id)
);

create index stagematch_ibfk_2
    on matchs (player1_id);

create index stagematch_ibfk_3
    on matchs (player2_id);

create table participation
(
    id            int auto_increment
        primary key,
    tournament_id int not null,
    player_id     int not null,
    constraint participation_ibfk_1
        foreign key (tournament_id) references tournament (id),
    constraint participation_ibfk_2
        foreign key (player_id) references users (id)
);

create index tournament_id
    on participation (tournament_id);

