

\COPY students (first_name, last_name, email, phone) FROM src/scripts/student.csv WITH (FORMAT csv, DELIMITER ',');
INSERT INTO interviewers (students_id, first_name, last_name, email, password)
VALUES
    (23, 'Samson', 'Brown', 'samson@rr.com', 'password'),
    (19, 'Ronnie', 'Miller', 'ronnie@gg.com', 'password'),
    (1, 'William', 'Swinson', 'will@ar15.com', 'password'),
    (2, 'Joseph', 'Carmeli', 'joseph@papi.com', 'password'),
    (3, 'Fitzgerald', 'Sicat', 'fitz@gpt.com', 'password'),
    (5, 'Danny', 'Andrews', 'danny@email.com', 'password');


\COPY interviews (students_id, interviewers_id, interview_date, question_notes, notes, results) FROM src/scripts/interview.csv WITH (FORMAT csv, DELIMITER ',');

INSERT INTO questions (questions)
VALUES
    ('Paste in their solution to one of the codeing chalenges and have them explain it.'),
    ('How would you be able to access and use the methods in the swissArmyKnife object below? 
    var swissArmyKnife = {
        miniScissors: function(item) {
            return ''cutting '' + item;
        },
        toothpick: function() {
            return ''clink clink'';
        },
        twezzers: function() {
            return ''pluck pluck'';
        }
    }'),
    ('Create a new variable called radio and set it equal to an empty object. Now add a method that a radio might have (e.g., play).'),
    ('How would we call this method?');
