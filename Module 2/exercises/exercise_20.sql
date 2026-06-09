USE event_management;

SELECT u.user_id, u.full_name, u.city,
       COUNT(DISTINCT r.event_id)    AS events_registered,
       COUNT(DISTINCT f.feedback_id) AS feedbacks_given
FROM Users u
LEFT JOIN Registrations r ON u.user_id = r.user_id
LEFT JOIN Feedback      f ON u.user_id = f.user_id
GROUP BY u.user_id, u.full_name, u.city
ORDER BY events_registered DESC, feedbacks_given DESC;
