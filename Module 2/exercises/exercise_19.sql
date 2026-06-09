USE event_management;

SELECT e.event_id, e.title, e.city,
       COUNT(DISTINCT r.registration_id) AS total_registrations,
       COUNT(DISTINCT f.feedback_id)     AS total_feedback,
       ROUND(AVG(f.rating), 2)           AS avg_rating
FROM Events e
LEFT JOIN Registrations r ON e.event_id = r.event_id
LEFT JOIN Feedback      f ON e.event_id = f.event_id
WHERE e.status = 'completed'
GROUP BY e.event_id, e.title, e.city
ORDER BY avg_rating DESC;
