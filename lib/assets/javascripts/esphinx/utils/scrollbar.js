// window.widthVerticalScrollbar = function (){
//   outside = $('<div></div>');
//   $('body').append outside;
//   inside = $('<div></div>');
//   outside.append(inside);

//   outsideHeight = $(document).height();
//   insideHeight = outsideHeight + 1;

//   outside.css({
//     height: "#{outsideHeight}px",
//     'overflow-y': 'hidden'});

//   inside.css({
//     height: "#{insideHeight}px"});

//   withoutScroll = $('div', outside).innerWidth();
//   outside.css({'overflow-y': 'auto'});
//   withScroll = $('div', outside).innerWidth();
//   $(outside).remove();
//   return withoutScroll - withScroll;
// }
