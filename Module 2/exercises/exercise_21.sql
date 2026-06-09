USE event_management;

SELECT u.user_id, u.full_name, u.email,
       COUNT(f.feedback_id) AS total_feedback
FROM Users u
JOIN Feedback f ON u.user_id = f.user_id
GROUP BY u.user_id, u.full_name, u.email
ORDER BY total_feedback DESC
LIMIT 5;
