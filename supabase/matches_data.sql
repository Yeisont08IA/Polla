-- =============================================
-- FIFA WORLD CUP 2026 - Group Stage Fixtures
-- 104 matches total
-- Times in UTC (Colombia = UTC-5)
-- =============================================

-- Group Stage (48 matches)
insert into public.matches (match_number, phase, group_name, team_home, team_away, flag_home, flag_away, match_date, venue) values
-- Group A
(1,  'group', 'A', 'México',     'Ecuador',      '🇲🇽', '🇪🇨', '2026-06-11 23:00:00+00', 'SoFi Stadium, Los Angeles'),
(2,  'group', 'A', 'Estados Unidos', 'Canada',   '🇺🇸', '🇨🇦', '2026-06-13 02:00:00+00', 'MetLife Stadium, Nueva York'),
(3,  'group', 'A', 'México',     'Canada',       '🇲🇽', '🇨🇦', '2026-06-18 22:00:00+00', 'AT&T Stadium, Dallas'),
(4,  'group', 'A', 'Ecuador',    'Estados Unidos','🇪🇨', '🇺🇸', '2026-06-19 01:00:00+00', 'Levi''s Stadium, San Francisco'),
(5,  'group', 'A', 'Canada',     'Ecuador',      '🇨🇦', '🇪🇨', '2026-06-23 02:00:00+00', 'Gillette Stadium, Boston'),
(6,  'group', 'A', 'Estados Unidos','México',    '🇺🇸', '🇲🇽', '2026-06-23 02:00:00+00', 'Arrowhead Stadium, Kansas City'),
-- Group B
(7,  'group', 'B', 'Argentina',  'Marruecos',    '🇦🇷', '🇲🇦', '2026-06-12 23:00:00+00', 'Hard Rock Stadium, Miami'),
(8,  'group', 'B', 'Albania',    'Ucrania',      '🇦🇱', '🇺🇦', '2026-06-13 01:00:00+00', 'Lincoln Financial, Filadelfia'),
(9,  'group', 'B', 'Argentina',  'Ucrania',      '🇦🇷', '🇺🇦', '2026-06-17 23:00:00+00', 'MetLife Stadium, Nueva York'),
(10, 'group', 'B', 'Albania',    'Marruecos',    '🇦🇱', '🇲🇦', '2026-06-18 01:00:00+00', 'Hard Rock Stadium, Miami'),
(11, 'group', 'B', 'Marruecos',  'Ucrania',      '🇲🇦', '🇺🇦', '2026-06-22 01:00:00+00', 'Levi''s Stadium, San Francisco'),
(12, 'group', 'B', 'Albania',    'Argentina',    '🇦🇱', '🇦🇷', '2026-06-22 01:00:00+00', 'Rose Bowl, Los Angeles'),
-- Group C
(13, 'group', 'C', 'España',     'Brasil',       '🇪🇸', '🇧🇷', '2026-06-13 23:00:00+00', 'MetLife Stadium, Nueva York'),
(14, 'group', 'C', 'Japón',      'Sudáfrica',    '🇯🇵', '🇿🇦', '2026-06-14 01:00:00+00', 'Rose Bowl, Los Angeles'),
(15, 'group', 'C', 'España',     'Sudáfrica',    '🇪🇸', '🇿🇦', '2026-06-18 23:00:00+00', 'Gillette Stadium, Boston'),
(16, 'group', 'C', 'Brasil',     'Japón',        '🇧🇷', '🇯🇵', '2026-06-19 01:00:00+00', 'SoFi Stadium, Los Angeles'),
(17, 'group', 'C', 'Sudáfrica',  'Brasil',       '🇿🇦', '🇧🇷', '2026-06-23 01:00:00+00', 'AT&T Stadium, Dallas'),
(18, 'group', 'C', 'Japón',      'España',       '🇯🇵', '🇪🇸', '2026-06-23 01:00:00+00', 'Lincoln Financial, Filadelfia'),
-- Group D
(19, 'group', 'D', 'Francia',    'Corea del Sur','🇫🇷', '🇰🇷', '2026-06-14 02:00:00+00', 'AT&T Stadium, Dallas'),
(20, 'group', 'D', 'Alemania',   'Colombia',     '🇩🇪', '🇨🇴', '2026-06-15 00:00:00+00', 'MetLife Stadium, Nueva York'),
(21, 'group', 'D', 'Francia',    'Colombia',     '🇫🇷', '🇨🇴', '2026-06-19 23:00:00+00', 'Rose Bowl, Los Angeles'),
(22, 'group', 'D', 'Alemania',   'Corea del Sur','🇩🇪', '🇰🇷', '2026-06-20 01:00:00+00', 'Hard Rock Stadium, Miami'),
(23, 'group', 'D', 'Colombia',   'Corea del Sur','🇨🇴', '🇰🇷', '2026-06-24 02:00:00+00', 'Gillette Stadium, Boston'),
(24, 'group', 'D', 'Francia',    'Alemania',     '🇫🇷', '🇩🇪', '2026-06-24 02:00:00+00', 'SoFi Stadium, Los Angeles'),
-- Group E
(25, 'group', 'E', 'Portugal',   'Arabia Saudita','🇵🇹', '🇸🇦', '2026-06-14 23:00:00+00', 'Arrowhead Stadium, Kansas City'),
(26, 'group', 'E', 'Senegal',    'Polonia',      '🇸🇳', '🇵🇱', '2026-06-15 02:00:00+00', 'Levi''s Stadium, San Francisco'),
(27, 'group', 'E', 'Portugal',   'Polonia',      '🇵🇹', '🇵🇱', '2026-06-20 02:00:00+00', 'AT&T Stadium, Dallas'),
(28, 'group', 'E', 'Senegal',    'Arabia Saudita','🇸🇳', '🇸🇦', '2026-06-20 23:00:00+00', 'Rose Bowl, Los Angeles'),
(29, 'group', 'E', 'Arabia Saudita','Polonia',   '🇸🇦', '🇵🇱', '2026-06-25 01:00:00+00', 'MetLife Stadium, Nueva York'),
(30, 'group', 'E', 'Portugal',   'Senegal',      '🇵🇹', '🇸🇳', '2026-06-25 01:00:00+00', 'Hard Rock Stadium, Miami'),
-- Group F
(31, 'group', 'F', 'Inglaterra', 'Irán',         '🏴󠁧󠁢󠁥󠁮󠁧󠁿', '🇮🇷', '2026-06-15 23:00:00+00', 'SoFi Stadium, Los Angeles'),
(32, 'group', 'F', 'Países Bajos','Camerún',     '🇳🇱', '🇨🇲', '2026-06-16 01:00:00+00', 'AT&T Stadium, Dallas'),
(33, 'group', 'F', 'Inglaterra', 'Camerún',      '🏴󠁧󠁢󠁥󠁮󠁧󠁿', '🇨🇲', '2026-06-20 22:00:00+00', 'Gillette Stadium, Boston'),
(34, 'group', 'F', 'Países Bajos','Irán',        '🇳🇱', '🇮🇷', '2026-06-21 01:00:00+00', 'Lincoln Financial, Filadelfia'),
(35, 'group', 'F', 'Camerún',    'Irán',         '🇨🇲', '🇮🇷', '2026-06-25 02:00:00+00', 'Arrowhead Stadium, Kansas City'),
(36, 'group', 'F', 'Inglaterra', 'Países Bajos', '🏴󠁧󠁢󠁥󠁮󠁧󠁿', '🇳🇱', '2026-06-25 02:00:00+00', 'Rose Bowl, Los Angeles'),
-- Group G
(37, 'group', 'G', 'Bélgica',    'Venezuela',    '🇧🇪', '🇻🇪', '2026-06-16 02:00:00+00', 'Rose Bowl, Los Angeles'),
(38, 'group', 'G', 'Australia',  'Ghana',        '🇦🇺', '🇬🇭', '2026-06-16 23:00:00+00', 'Hard Rock Stadium, Miami'),
(39, 'group', 'G', 'Bélgica',    'Ghana',        '🇧🇪', '🇬🇭', '2026-06-21 23:00:00+00', 'AT&T Stadium, Dallas'),
(40, 'group', 'G', 'Australia',  'Venezuela',    '🇦🇺', '🇻🇪', '2026-06-22 02:00:00+00', 'Levi''s Stadium, San Francisco'),
(41, 'group', 'G', 'Ghana',      'Venezuela',    '🇬🇭', '🇻🇪', '2026-06-26 01:00:00+00', 'SoFi Stadium, Los Angeles'),
(42, 'group', 'G', 'Australia',  'Bélgica',      '🇦🇺', '🇧🇪', '2026-06-26 01:00:00+00', 'MetLife Stadium, Nueva York'),
-- Group H
(43, 'group', 'H', 'Uruguay',    'República Checa','🇺🇾', '🇨🇿', '2026-06-17 01:00:00+00', 'Arrowhead Stadium, Kansas City'),
(44, 'group', 'H', 'Suiza',      'Nigeria',      '🇨🇭', '🇳🇬', '2026-06-17 23:00:00+00', 'Lincoln Financial, Filadelfia'),
(45, 'group', 'H', 'Uruguay',    'Nigeria',      '🇺🇾', '🇳🇬', '2026-06-22 23:00:00+00', 'SoFi Stadium, Los Angeles'),
(46, 'group', 'H', 'Suiza',      'República Checa','🇨🇭', '🇨🇿', '2026-06-23 02:00:00+00', 'Rose Bowl, Los Angeles'),
(47, 'group', 'H', 'Nigeria',    'República Checa','🇳🇬', '🇨🇿', '2026-06-27 01:00:00+00', 'Hard Rock Stadium, Miami'),
(48, 'group', 'H', 'Uruguay',    'Suiza',        '🇺🇾', '🇨🇭', '2026-06-27 01:00:00+00', 'Gillette Stadium, Boston'),
-- Groups I-L (remaining 24 group stage matches)
-- Group I
(49, 'group', 'I', 'Italia',     'Perú',         '🇮🇹', '🇵🇪', '2026-06-17 02:00:00+00', 'Rose Bowl, Los Angeles'),
(50, 'group', 'I', 'México (2)', 'Chile',        '🇲🇽', '🇨🇱', '2026-06-17 22:00:00+00', 'AT&T Stadium, Dallas'),
(51, 'group', 'I', 'Italia',     'Chile',        '🇮🇹', '🇨🇱', '2026-06-22 02:00:00+00', 'MetLife Stadium, Nueva York'),
(52, 'group', 'I', 'México (2)', 'Perú',         '🇲🇽', '🇵🇪', '2026-06-22 22:00:00+00', 'SoFi Stadium, Los Angeles'),
(53, 'group', 'I', 'Perú',       'Chile',        '🇵🇪', '🇨🇱', '2026-06-27 02:00:00+00', 'Lincoln Financial, Filadelfia'),
(54, 'group', 'I', 'Italia',     'México (2)',   '🇮🇹', '🇲🇽', '2026-06-27 02:00:00+00', 'Arrowhead Stadium, Kansas City'),
-- Group J
(55, 'group', 'J', 'Croacia',    'Turquía',      '🇭🇷', '🇹🇷', '2026-06-18 02:00:00+00', 'MetLife Stadium, Nueva York'),
(56, 'group', 'J', 'Serbia',     'Dinamarca',    '🇷🇸', '🇩🇰', '2026-06-18 22:00:00+00', 'Hard Rock Stadium, Miami'),
(57, 'group', 'J', 'Croacia',    'Dinamarca',    '🇭🇷', '🇩🇰', '2026-06-23 22:00:00+00', 'AT&T Stadium, Dallas'),
(58, 'group', 'J', 'Serbia',     'Turquía',      '🇷🇸', '🇹🇷', '2026-06-24 01:00:00+00', 'Levi''s Stadium, San Francisco'),
(59, 'group', 'J', 'Dinamarca',  'Turquía',      '🇩🇰', '🇹🇷', '2026-06-28 01:00:00+00', 'Rose Bowl, Los Angeles'),
(60, 'group', 'J', 'Croacia',    'Serbia',       '🇭🇷', '🇷🇸', '2026-06-28 01:00:00+00', 'SoFi Stadium, Los Angeles'),
-- Group K
(61, 'group', 'K', 'China',      'Países Bajos (2)','🇨🇳', '🇳🇱', '2026-06-19 02:00:00+00', 'Gillette Stadium, Boston'),
(62, 'group', 'K', 'Escocia',    'Paraguay',     '🏴󠁧󠁢󠁳󠁣󠁴󠁿', '🇵🇾', '2026-06-19 22:00:00+00', 'Arrowhead Stadium, Kansas City'),
(63, 'group', 'K', 'China',      'Paraguay',     '🇨🇳', '🇵🇾', '2026-06-24 22:00:00+00', 'MetLife Stadium, Nueva York'),
(64, 'group', 'K', 'Escocia',    'Países Bajos (2)','🏴󠁧󠁢󠁳󠁣󠁴󠁿', '🇳🇱', '2026-06-25 01:00:00+00', 'Hard Rock Stadium, Miami'),
(65, 'group', 'K', 'Paraguay',   'Países Bajos (2)','🇵🇾', '🇳🇱', '2026-06-29 01:00:00+00', 'AT&T Stadium, Dallas'),
(66, 'group', 'K', 'China',      'Escocia',      '🇨🇳', '🏴󠁧󠁢󠁳󠁣󠁴󠁿', '2026-06-29 01:00:00+00', 'Lincoln Financial, Filadelfia'),
-- Group L
(67, 'group', 'L', 'Costa Rica', 'Kenia',        '🇨🇷', '🇰🇪', '2026-06-19 23:00:00+00', 'SoFi Stadium, Los Angeles'),
(68, 'group', 'L', 'Nueva Zelanda','Bolivia',    '🇳🇿', '🇧🇴', '2026-06-20 01:00:00+00', 'Rose Bowl, Los Angeles'),
(69, 'group', 'L', 'Costa Rica', 'Bolivia',      '🇨🇷', '🇧🇴', '2026-06-25 22:00:00+00', 'Gillette Stadium, Boston'),
(70, 'group', 'L', 'Nueva Zelanda','Kenia',      '🇳🇿', '🇰🇪', '2026-06-26 01:00:00+00', 'Arrowhead Stadium, Kansas City'),
(71, 'group', 'L', 'Kenia',      'Bolivia',      '🇰🇪', '🇧🇴', '2026-06-29 22:00:00+00', 'Hard Rock Stadium, Miami'),
(72, 'group', 'L', 'Costa Rica', 'Nueva Zelanda','🇨🇷', '🇳🇿', '2026-06-30 01:00:00+00', 'MetLife Stadium, Nueva York'),

-- Round of 32 (16 matches) - TBD teams
(73,  'r32', null, 'TBD A1', 'TBD B2', '🏳️', '🏳️', '2026-07-04 23:00:00+00', 'Por definir'),
(74,  'r32', null, 'TBD C1', 'TBD D2', '🏳️', '🏳️', '2026-07-05 01:00:00+00', 'Por definir'),
(75,  'r32', null, 'TBD E1', 'TBD F2', '🏳️', '🏳️', '2026-07-05 23:00:00+00', 'Por definir'),
(76,  'r32', null, 'TBD G1', 'TBD H2', '🏳️', '🏳️', '2026-07-06 01:00:00+00', 'Por definir'),
(77,  'r32', null, 'TBD I1', 'TBD J2', '🏳️', '🏳️', '2026-07-06 23:00:00+00', 'Por definir'),
(78,  'r32', null, 'TBD K1', 'TBD L2', '🏳️', '🏳️', '2026-07-07 01:00:00+00', 'Por definir'),
(79,  'r32', null, 'TBD B1', 'TBD A2', '🏳️', '🏳️', '2026-07-07 23:00:00+00', 'Por definir'),
(80,  'r32', null, 'TBD D1', 'TBD C2', '🏳️', '🏳️', '2026-07-08 01:00:00+00', 'Por definir'),
(81,  'r32', null, 'TBD F1', 'TBD E2', '🏳️', '🏳️', '2026-07-08 23:00:00+00', 'Por definir'),
(82,  'r32', null, 'TBD H1', 'TBD G2', '🏳️', '🏳️', '2026-07-09 01:00:00+00', 'Por definir'),
(83,  'r32', null, 'TBD J1', 'TBD I2', '🏳️', '🏳️', '2026-07-09 23:00:00+00', 'Por definir'),
(84,  'r32', null, 'TBD L1', 'TBD K2', '🏳️', '🏳️', '2026-07-10 01:00:00+00', 'Por definir'),
(85,  'r32', null, '3ro Best 1', '3ro Best 2', '🏳️', '🏳️', '2026-07-10 23:00:00+00', 'Por definir'),
(86,  'r32', null, '3ro Best 3', '3ro Best 4', '🏳️', '🏳️', '2026-07-11 01:00:00+00', 'Por definir'),
(87,  'r32', null, '3ro Best 5', '3ro Best 6', '🏳️', '🏳️', '2026-07-11 23:00:00+00', 'Por definir'),
(88,  'r32', null, '3ro Best 7', '3ro Best 8', '🏳️', '🏳️', '2026-07-12 01:00:00+00', 'Por definir'),

-- Round of 16 (8 matches)
(89,  'r16', null, 'TBD', 'TBD', '🏳️', '🏳️', '2026-07-14 23:00:00+00', 'Por definir'),
(90,  'r16', null, 'TBD', 'TBD', '🏳️', '🏳️', '2026-07-15 01:00:00+00', 'Por definir'),
(91,  'r16', null, 'TBD', 'TBD', '🏳️', '🏳️', '2026-07-15 23:00:00+00', 'Por definir'),
(92,  'r16', null, 'TBD', 'TBD', '🏳️', '🏳️', '2026-07-16 01:00:00+00', 'Por definir'),
(93,  'r16', null, 'TBD', 'TBD', '🏳️', '🏳️', '2026-07-16 23:00:00+00', 'Por definir'),
(94,  'r16', null, 'TBD', 'TBD', '🏳️', '🏳️', '2026-07-17 01:00:00+00', 'Por definir'),
(95,  'r16', null, 'TBD', 'TBD', '🏳️', '🏳️', '2026-07-17 23:00:00+00', 'Por definir'),
(96,  'r16', null, 'TBD', 'TBD', '🏳️', '🏳️', '2026-07-18 01:00:00+00', 'Por definir'),

-- Quarterfinals (4 matches)
(97,  'qf', null, 'TBD', 'TBD', '🏳️', '🏳️', '2026-07-21 23:00:00+00', 'Por definir'),
(98,  'qf', null, 'TBD', 'TBD', '🏳️', '🏳️', '2026-07-22 01:00:00+00', 'Por definir'),
(99,  'qf', null, 'TBD', 'TBD', '🏳️', '🏳️', '2026-07-22 23:00:00+00', 'Por definir'),
(100, 'qf', null, 'TBD', 'TBD', '🏳️', '🏳️', '2026-07-23 01:00:00+00', 'Por definir'),

-- Semifinals (2 matches)
(101, 'sf', null, 'TBD', 'TBD', '🏳️', '🏳️', '2026-07-27 23:00:00+00', 'Por definir'),
(102, 'sf', null, 'TBD', 'TBD', '🏳️', '🏳️', '2026-07-28 23:00:00+00', 'Por definir'),

-- 3rd Place
(103, '3rd', null, 'TBD', 'TBD', '🏳️', '🏳️', '2026-08-01 01:00:00+00', 'Por definir'),

-- Final
(104, 'final', null, 'TBD', 'TBD', '🏳️', '🏳️', '2026-08-02 23:00:00+00', 'MetLife Stadium, Nueva York');

