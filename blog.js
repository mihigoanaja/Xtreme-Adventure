var rssUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https://xtremeadventureblog.blogspot.com/feeds/posts/default';
function minimizeHtml(html) {
  // Remove comments
  html = html.replace(/<!--.*?-->/g, '');

  // Remove whitespace between tags
  html = html.replace(/>\s+</g, '><');

  // Remove whitespace within tags
  html = html.replace(/\s+/g, ' ');

  // Remove newline characters
  html = html.replace(/\n/g, '');

  // Remove unnecessary attributes
  html = html.replace(/\s+class=""/g, '');
  html = html.replace(/\s+id=""/g, '');
  html = html.replace(/\s+style=""/g, '');

  // Remove empty tags
  //html = html.replace(/<[^>]*>\s*<\/[^>]*>/g, '');
  //html = html.replace(/<[^>]*>\s*(<\/[^>]*>)/g, '$1');

  return html;
}
fetch(rssUrl)
  .then(response => response.text())
  .then(data => {
	d=data;
	var items=JSON.parse(data).items;
    var results = [];
    for (let i = 0; i < 3; i++) {
      var item = items[i];
      var title = item.title;
      var link = item.link;
      var description = item.description;

      // Extract the first image src from the description HTML
		var imgSrcRegex = /<img\s+[^>]*src="([^"]+)"/;
		var match = description.match(imgSrcRegex);
		var imgSrc = match && match[1];
		//document.querySelector('#features3-1p > div > div.row.mt-4 > div:nth-child(1) > div > div.item-img > img').src=imgSrc;
      results.push({
        title,
        link,
        imgSrc,
        description
      });
    }

    var html = results.map((result, index) => {
	  return `
		<div class="item features-image сol-12 col-md-6 col-lg-4">
                <div class="item-wrapper">
                    <!--<div class="item-img">
                        <img src="${result.imgSrc}" alt="${result.title}">
                    </div>-->
                    <div class="item-content">
                        <h5 class="item-title mbr-fonts-style display-5"><strong>${result.title}</strong></h5>
                        
                        <p class="mbr-text mbr-fonts-style mt-3 display-7">${result.description.replace(/\s+/g, ' ').replace(/<[\s\S]*>(\s*)<\/[\s\S]*>/g, '$1').split('').splice(0,100).join('')}</p>
                    </div>
                    <div class="mbr-section-btn item-footer mt-2">
						<a href="${result.link}" class="btn item-btn btn-secondary-outline display-4" target="_blank">Read More &gt;</a>
					</div>
                </div>
        </div>
      `;
	  
    }).join('');

    document.querySelector('#features3-1p > div > div.row.mt-4').innerHTML = minimizeHtml(html);
	console.log((html));
	console.log(minimizeHtml(html));
  })
  .catch(error => console.error('Error:', error));