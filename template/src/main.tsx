import p1 from "./js/p1";
import p2 from "./js/p2";

declare const apex: any;
const $ = apex.jQuery;

export {
  p1,
  p2
};

$(document).ready(() => {
	const pageId = Number(document.getElementById("pFlowStepId").value);
  if (pageId === 1) p1.init();
  if (pageId === 2) p2.init();
});
