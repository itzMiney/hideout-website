#!/bin/bash

# Set the directory you want to list
DIRECTORY=$1
OUTPUT_FILE=$2

# Start the HTML file
cat <<EOF > $OUTPUT_FILE
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <title>HideoutSMP | Directory Listing</title>
  <meta charset="utf-8">
  <meta name="description" content="HideoutSMP | Directory Listing">
  <meta name="keywords" content="Minecraft,Server,Gaming,Survival,PvP,Minigames">
  <meta name="author" content="itzMiney">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="apple-touch-icon" sizes="180x180" href="/media/favicon/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/media/favicon/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/media/favicon/favicon-16x16.png">
  <link rel="manifest" href="/media/favicon/site.webmanifest">
  <link rel="mask-icon" href="/media/favicon/safari-pinned-tab.svg" color="#5bbad5">
  <link rel="shortcut icon" href="/media/favicon/favicon.ico">
  <meta name="msapplication-TileColor" content="#603cba">
  <meta name="msapplication-config" content="/media/favicon/browserconfig.xml">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="stylesheet" href="/static/css/default.css">
  <link rel="stylesheet" href="/static/css/fonts.css">
  <script src="/static/js/default.js" defer></script>
  <style>
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: 8px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    th {
      background-color: #f2f2f2;
    }
    .size {
      text-align: right;
    }
  </style>
</head>
<body>
  <div class="navbar-container fixed-top">
    <div id="navbar" class="container">
      <p><a href="/"><img src="media/images/icon.svg" class="logo" alt="HideoutSMP Logo"></a></p><a href="/" class="wordmark">HideoutSMP</a>
      <ul>
        <li><a href="/shop">Shop</a></li>
        <li><a href="/team">Team</a></li>
        <li><a href="/guidelines">Community Guidelines</a></li>
        <li><a href="/blockparty">Block Party</a></li>
      </ul>
    </div>
  </div>
  <div class="outer-container">
    <div class="container inner-container">
      <div class="content">
        <h1>Directory Listing for $DIRECTORY</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th class="size">Size</th>
              <th>Last Modified</th>
            </tr>
          </thead>
          <tbody>
EOF

# Iterate over each file in the directory
for entry in "$DIRECTORY"/*; do
    name=$(basename "$entry")
    size=$(stat -c%s "$entry")
    mod_time=$(stat -c%y "$entry")
    if [ -d "$entry" ]; then
        size="-"
    else
        size=$(numfmt --to=iec-i --suffix=B "$size")
    fi
    cat <<EOF >> $OUTPUT_FILE
            <tr>
              <td><a href="$name">$name</a></td>
              <td class="size">$size</td>
              <td>$mod_time</td>
            </tr>
EOF
done

# End the HTML file
cat <<EOF >> $OUTPUT_FILE
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="footer">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <h5>Contact Us</h5>
          <p>Email: info@hideoutsmp.net</p>
          <a href="#" id="openContactForm">Contact Form</a>
        </div>
        <div class="col-md-4">
          <h5>Follow Us</h5>
          <a href="https://youtube.com/@itzMiney">YouTube</a> | <a href="https://twitter.com/@itzMiney">Twitter</a> | <a href="https://twitch.tv/itzminey">Twitch</a>
        </div>
        <div class="col-md-4">
          <h5>Links</h5>
          <ul>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/team">Team</a></li>
            <li><a href="/guidelines">Community Guidelines</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/cookie-policy">Cookie-Policy</a></li>
            <li><a href="/imprint">Imprint</a></li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-12 text-center">
          <p>&copy; 2024 HideoutSMP. All rights reserved.</p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
EOF

echo "Directory listing generated at $OUTPUT_FILE"
