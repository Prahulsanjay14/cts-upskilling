USE event_management;

SELECT e.event_id, e.title, e.status, e.city, e.start_date
FROM Events e
LEFT JOIN Sessions s ON e.event_id = s.event_id
WHERE s.session_id IS NULL
ORDER BY e.start_date ASC;
