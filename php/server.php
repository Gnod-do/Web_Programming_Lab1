<?php
session_start();
date_default_timezone_set('Europe/Moscow');
$start = microtime(true);
$x = (float)$_POST['x'];
$y = (float)$_POST['y'];
$r = (float)$_POST['r'];
function check($x, $y, $r) {
    $condition1 = ($x >= 0) && ($x <= $r/2) && ($y >= 0) && ($y <= $r/2) && (-$x + $r/2 >= $y);
    $condition2 = ($x >= -$r/2) && ($x <= 0) && ($y >= 0) && ($y <= $r/2) && ($x*$x + $y*$y <= $r*$r/4);
    $condition3 = ($x >= -$r/2) && ($x <= 0) && ($y >= -$r) && ($y <= 0);

    if ($condition1 || $condition2 || $condition3) {
        return "<span style='color: #7FFF5C'>True</span>";
    } else {
        return "<span style='color: #FF47A0'>False</span>";
    }
}


$result = check($x,$y,$r);
$now = date("H:i:s");
$now .= "💣";
$answer = array($x, $y, $r, check($x, $y, $r), $now, microtime(true) - $start);
if (!isset($_SESSION['data'])) {
    $_SESSION['data'] = array();
}
array_push($_SESSION['data'], $answer);
?>
<table align="center" class="not-main-table">
    <tr>
        <th class="variable">X</th>
        <th class="variable">Y</th>
        <th class="variable">R</th>
        <th>Result</th>
        <th>Time</th>
        <th>Script time</th>
    </tr>
    <?php foreach ($_SESSION['data'] as $key) { ?>
    <tr>
        <td><?php echo $key[0] ?></td>
        <td><?php echo $key[1] ?></td>
        <td><?php echo $key[2] ?></td>
        <td><?php echo $key[3] ?></td>
        <td><?php echo $key[4] ?></td>
        <td><?php echo number_format($key[5], 7, ".", "") ?></td>
    </tr>
    <?php }?>
</table>