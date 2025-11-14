<?php
$branch = getenv('BRANCH_NAME') ?: 'unknown';
$hostname = gethostname();
$platform = PHP_OS;
$timestamp = date('d/m/Y H:i:s');
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Preview Environment - <?php echo htmlspecialchars($branch); ?></title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      background: rgba(255,255,255,0.95);
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      max-width: 600px;
      width: 100%;
    }
    h1 {
      color: #667eea;
      margin-bottom: 30px;
      font-size: 2.5em;
      text-align: center;
    }
    .info {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 10px;
      margin: 15px 0;
      border-left: 4px solid #667eea;
    }
    .info strong {
      color: #333;
      display: inline-block;
      min-width: 120px;
    }
    .info span {
      color: #667eea;
      font-weight: 600;
    }
    .success {
      background: #d4edda;
      color: #155724;
      padding: 15px;
      border-radius: 10px;
      margin-top: 20px;
      text-align: center;
      font-weight: 600;
    }
    .emoji { font-size: 1.5em; }
  </style>
</head>
<body>
  <div class="container">
    <h1><span class="emoji">🚀</span> Preview Environment</h1>
    <div class="info">
      <strong>Branch:</strong> <span><?php echo htmlspecialchars($branch); ?></span>
    </div>
    <div class="info">
      <strong>Hostname:</strong> <span><?php echo htmlspecialchars($hostname); ?></span>
    </div>
    <div class="info">
      <strong>Platform:</strong> <span><?php echo htmlspecialchars($platform); ?></span>
    </div>
    <div class="info">
      <strong>Timestamp:</strong> <span><?php echo $timestamp; ?></span>
    </div>
    <div class="success">
      ✅ Deployment realizado com sucesso!
    </div>
  </div>
  <?php phpinfo(); ?>
</body>
</html>
