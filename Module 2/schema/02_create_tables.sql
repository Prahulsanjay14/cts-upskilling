USE event_management;

CREATE TABLE IF NOT EXISTS Users (
    user_id           INT          PRIMARY KEY AUTO_INCREMENT,
    full_name         VARCHAR(100) NOT NULL,
    email             VARCHAR(100) UNIQUE NOT NULL,
    city              VARCHAR(100) NOT NULL,
    registration_date DATE         NOT NULL
);

CREATE TABLE IF NOT EXISTS Events (
    event_id     INT          PRIMARY KEY AUTO_INCREMENT,
    title        VARCHAR(200) NOT NULL,
    description  TEXT,
    city         VARCHAR(100) NOT NULL,
    start_date   DATETIME     NOT NULL,
    end_date     DATETIME     NOT NULL,
    status       ENUM('upcoming', 'completed', 'cancelled') NOT NULL,
    organizer_id INT,
    FOREIGN KEY (organizer_id) REFERENCES Users(user_id)
);

CREATE TABLE IF NOT EXISTS Sessions (
    session_id   INT          PRIMARY KEY AUTO_INCREMENT,
    event_id     INT          NOT NULL,
    title        VARCHAR(200) NOT NULL,
    speaker_name VARCHAR(100) NOT NULL,
    start_time   DATETIME     NOT NULL,
    end_time     DATETIME     NOT NULL,
    FOREIGN KEY (event_id) REFERENCES Events(event_id)
);

CREATE TABLE IF NOT EXISTS Registrations (
    registration_id   INT  PRIMARY KEY AUTO_INCREMENT,
    user_id           INT  NOT NULL,
    event_id          INT  NOT NULL,
    registration_date DATE NOT NULL,
    FOREIGN KEY (user_id)  REFERENCES Users(user_id),
    FOREIGN KEY (event_id) REFERENCES Events(event_id)
);

CREATE TABLE IF NOT EXISTS Feedback (
    feedback_id   INT  PRIMARY KEY AUTO_INCREMENT,
    user_id       INT  NOT NULL,
    event_id      INT  NOT NULL,
    rating        INT  CHECK (rating BETWEEN 1 AND 5),
    comments      TEXT,
    feedback_date DATE NOT NULL,
    FOREIGN KEY (user_id)  REFERENCES Users(user_id),
    FOREIGN KEY (event_id) REFERENCES Events(event_id)
);

CREATE TABLE IF NOT EXISTS Resources (
    resource_id   INT          PRIMARY KEY AUTO_INCREMENT,
    event_id      INT          NOT NULL,
    resource_type ENUM('pdf', 'image', 'link') NOT NULL,
    resource_url  VARCHAR(255) NOT NULL,
    uploaded_at   DATETIME     NOT NULL,
    FOREIGN KEY (event_id) REFERENCES Events(event_id)
);
