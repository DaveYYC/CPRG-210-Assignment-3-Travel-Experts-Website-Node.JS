
// Script to assign class of current to links for higlighting

for (const i = 0; i < document.links.length; i++) {
  if (document.links[i].href == document.URL) {
      document.links[i].className = 'current';
  } else {document.links[0].className = 'current';}
}