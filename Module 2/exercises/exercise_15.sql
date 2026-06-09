USE event_management;

SELECT a.event_id,
       a.session_id AS session_a, a.title AS title_a, a.start_time AS a_start, a.end_time AS a_end,
       b.session_id AS session_b, b.title AS title_b, b.start_time AS b_start, b.end_time AS b_end
FROM Sessions a
JOIN Sessions b
  ON  a.event_id   = b.event_id
  AND a.session_id < b.session_id
  AND a.start_time < b.end_time
  AND a.end_time   > b.start_time
ORDER BY a.event_id, a.session_id;
