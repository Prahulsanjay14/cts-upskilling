USE event_management;

SELECT u.city,
       COUNT(DISTINCT r.user_id) AS unique_registrations
FROM Registrations r
JOIN Users u ON r.user_id = u.user_id
GROUP BY u.city
ORDER BY unique_registrations DESC
LIMIT 5;
