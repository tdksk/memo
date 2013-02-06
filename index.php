<?
if (isset($_GET['date'])) {
  $d = new DateTime($_GET['date']);
} else {
  $d = new DateTime();
}
$date = $d->format('Y-m-d (D)');
$m = new DateTime($d->format('Y-m'));
$filename = 'docs/' . $d->format('Ymd') . '.txt';
$contents = file_get_contents($filename);
$yesterday = $d->modify('-1 day')->format('Ymd');
$tomorrow = $d->modify('+2 days')->format('Ymd');
$d->modify('-1 day');
?>

<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="css/style.css" media="all">
    <title>Note</title>
  </head>
  <body>
    <div id="header">
      <h2 class="date">
        <small><a href="?date=<?=$yesterday?>">◀</a></small>
        <?=$date?>
        <? if ($d->format('Ymd') < date('Ymd')): ?>
        <small><a href="?date=<?=$tomorrow?>">▶</a></small>
        <? endif; ?>
      </h2>
      <? if ($date != date('Y-m-d (D)')): ?>
      <div class="today">
        <a href="./"><button>今日のノートへ戻る</button></a>
      </div>
      <? endif; ?>
      <div class="find-note">
        <button>ノートを見返す▼</button>
        <div class="sub">
          <ul class="calendar">
            <li class="month"><?=$m->format('Y-m')?></li>
            <li>日</li><li>月</li><li>火</li><li>水</li><li>木</li><li>金</li><li>土</li>
            <?
            for ($i = 0; $i < $m->format('w'); $i++) {
              echo '<li></li>';
            }
            ?>
            <?
            for ($i = 1; $i < $d->format('t') + 1; $i++) {
              if ($i > date('d') || !file_exists('docs/' . $m->format('Ym') . sprintf('%02d', $i) . '.txt')) {
                echo '<li>' . $i . '</li>';
              } else {
                echo '<li><a href="?date=' . $m->format('Ym') . sprintf('%02d', $i) . '">' . $i . '</a></li>';
              }
            }
            ?>
          </ul>
        </div>
      </div>
      <form method="post">
        <input type="text" class="searchbox" placeholder="今までのノートから検索">
      </form>
      <p class="save-failed">保存に失敗しました。通信状況を確認し、再度文字入力してください。</p>
    </div>
    <div id="sidebar">
      <ul>
      </ul>
    </div>
    <div id="editor"><?=$contents?></div>
    <script src="src/ace.js"></script>
    <script src="js/jquery-1.7.2.min.js"></script>
    <script src="js/scripts.js"></script>
    <? if ($date == date('Y-m-d (D)')): ?>
    <script src="js/edit_mode.js"></script>
    <? else: ?>
    <script src="js/view_mode.js"></script>
    <? endif; ?>
  </body>
</html>
