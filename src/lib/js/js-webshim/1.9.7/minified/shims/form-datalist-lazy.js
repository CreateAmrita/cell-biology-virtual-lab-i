webshims.register("form-datalist-lazy",function(e,t,n,i,a,r){var o=0,s=e.webshims.cfg.forms,l={},u=function(e){if(!e)return[];if(l[e])return l[e];var t;try{t=JSON.parse(localStorage.getItem("storedDatalistOptions"+e))}catch(n){}return l[e]=t||[],t||[]},c=function(e,t){if(e){t=t||[];try{localStorage.setItem("storedDatalistOptions"+e,JSON.stringify(t))}catch(n){}}},d=/</g,p=/>/g;e.extend(r.shadowListProto,{_lazyCreate:function(i){var o=this;this.hideList=e.proxy(o,"hideList"),this.popover=t.objectCreate(t.wsPopover,{},r.datalistPopover),this.shadowList=this.popover.element.addClass("datalist-polyfill"),this.index=-1,this.input=i.input,this.arrayOptions=[],this.shadowList.delegate("li","mouseenter.datalistWidget mousedown.datalistWidget click.datalistWidget",function(t){var n=e("li:not(.hidden-item)",o.shadowList),a="mousedown"==t.type||"click"==t.type;return o.markItem(n.index(t.currentTarget),a,n),"click"==t.type&&(o.hideList(),s.customDatalist&&e(i.input).getNativeElement().trigger("datalistselect")),"mousedown"!=t.type}),i.input.setAttribute("autocomplete","off"),e(i.input).attr({"aria-haspopup":"true"}).on({"input.datalistWidget":function(){o.triggeredByDatalist||(o.changedValue=!1,o.showHideOptions())},"keydown.datalistWidget":function(t){var n,r,l=t.keyCode;return 40!=l||o.showList()?o.popover.isVisible?38==l?(o.markItem(o.index-1,!0),!1):t.shiftKey||33!=l&&36!=l?t.shiftKey||34!=l&&35!=l?(13==l||27==l)&&(13==l&&(n=e("li.active-item:not(.hidden-item)",o.shadowList),o.changeValue(e("li.active-item:not(.hidden-item)",o.shadowList))),o.hideList(),s.customDatalist&&n&&n[0]&&e(i.input).getNativeElement().trigger("datalistselect"),13!=t.keyCode||n&&n[0])?!1:a:(r=e("li:not(.hidden-item)",o.shadowList),o.markItem(r.length-1,!0,r),!1):(o.markItem(0,!0),!1):a:(o.markItem(o.index+1,!0),!1)},"focus.datalistWidget":function(){e(this).hasClass("list-focus")&&o.showList()},"mousedown.datalistWidget":function(){e(this).is(":focus")&&o.showList()}}),e(this.datalist).off("updateDatalist.datalistWidget").on("updateDatalist.datalistWidget",e.proxy(this,"_resetListCached")).on("remove",function(e){e.originalEvent||o.detroy()}),this._resetListCached(),i.input.form&&(i.input.name||i.input.id)&&e(i.input.form).on("submit.datalistWidget"+i.input.id,function(){if(!e(i.input).hasClass("no-datalist-cache")&&"off"!=o._autocomplete){var t=e.prop(i.input,"value"),n=(i.input.name||i.input.id)+e.prop(i.input,"type");o.storedOptions||(o.storedOptions=u(n)),t&&-1==o.storedOptions.indexOf(t)&&(o.storedOptions.push(t),c(n,o.storedOptions))}}),e(n).on("unload.datalist"+this.id+" beforeunload.datalist"+this.id,function(e){o.destroy(e)})},_resetListCached:function(){var i,a=this;this.needsUpdate=!0,this.lastUpdatedValue=!1,this.lastUnfoundValue="",this.updateTimer||(n.QUnit||(i=e(a.input).is(":focus")&&(e(a.input).hasClass("list-focus")||e.prop(a.input,"value")))?a.updateListOptions(i):t.ready("WINDOWLOAD",function(){a.updateTimer=setTimeout(function(){a.updateListOptions(),a=null,o=1},200+100*o)}))},updateListOptions:function(t){this.needsUpdate=!1,clearTimeout(this.updateTimer),this.updateTimer=!1,this.searchStart=s.customDatalist&&e(this.input).hasClass("search-start"),this.addMarkElement=r.addMark||e(this.input).hasClass("mark-option-text");var n,i,a,o,l,c,f,h=[],m=[],v=[];for(a=e.prop(this.datalist,"options"),o=0,l=a.length;l>o;o++)n=a[o],!n.disabled&&(f=e(n).val())&&(i={value:f.replace(d,"&lt;").replace(p,"&gt;"),label:e.trim(e.attr(n,"label"))||"",className:n.className||""},i.label&&(i.className+=" has-option-label"),m.push(i.value),v.push(i));for(this.storedOptions||(this.storedOptions=e(this.input).hasClass("no-datalist-cache")||"off"==this._autocomplete?[]:u((this.input.name||this.input.id)+e.prop(this.input,"type"))),this.storedOptions.forEach(function(e){-1==m.indexOf(e)&&v.push({value:e,label:"",className:"stored-suggest",style:""})}),o=0,l=v.length;l>o;o++)c=v[o],h[o]='<li class="'+c.className+'" tabindex="-1" role="listitem">'+this.getOptionContent(c)+"</li>";this.arrayOptions=v,this.popover.contentElement.html('<div class="datalist-box"><ul role="list">'+h.join("\n")+"</ul></div>"),(t||this.popover.isVisible)&&this.showHideOptions()},getOptionContent:function(e){var t="";return r.getOptionContent?t=r.apply(this,arguments)||"":(t='<span class="option-value">'+e.value+"</span>",e.label&&(t+=' <span class="option-label">'+e.label+"</span>")),t},showHideOptions:function(t){var n=e.prop(this.input,"value").toLowerCase();if(n!==this.lastUpdatedValue){if(this.lastUnfoundValue&&0===n.indexOf(this.lastUnfoundValue))return this.hideList(),a;this.lastUpdatedValue=n;var i=!1,r=this.searchStart,o=e("li",this.shadowList),s=this;n?this.arrayOptions.forEach(function(t,a){var l,u,c;"lowerValue"in t||(t.lowerValue=t.value.toLowerCase(),t.label&&t.label!=t.value&&(t.lowerLabel=t.label.toLowerCase())),n!=t.lowerValue&&t.lowerLabel!=n&&(u=t.lowerValue.indexOf(n),l=r?!u:-1!==u,l?c="value":t.lowerLabel&&(u=t.lowerLabel.indexOf(n),l=r?!u:-1!==u,c="label")),l?(s.addMark(e(o[a]).removeClass("hidden-item"),t,c,u,n.length),i=!0):e(o[a]).addClass("hidden-item")}):o.length&&(this.removeMark(o.removeClass("hidden-item")),i=!0),this.hasViewableData=i,!t&&i&&this.showList(),i?this.lastUnfoundValue=!1:(this.lastUnfoundValue=n,this.hideList())}},otherType:{value:"label",label:"value"},addMark:function(t,n,i,a,r){if(this.addMarkElement){var o=n[i].substr(a,r);o=n[i].replace(o,"<mark>"+o+"</mark>"),e(".option-"+this.otherType[i]+" > mark",t).each(this._replaceMark),e(".option-"+i,t).html(o)}},_replaceMark:function(){var t=e(this).html();e(this).replaceWith(t)},removeMark:function(t){this.addMarkElement&&e("mark",t).each(this._replaceMark)},showList:function(){if(this.popover.isVisible)return!1;if(this.needsUpdate&&this.updateListOptions(),this.showHideOptions(!0),!this.hasViewableData)return!1;var e=this;return e.shadowList.find("li.active-item").removeClass("active-item"),e.popover.show(this.input),!0},hideList:function(){if(!this.popover.isVisible)return!1;var t=this;return this.popover.hide(),t.shadowList.removeClass("datalist-visible list-item-active"),t.index=-1,t.changedValue&&(t.triggeredByDatalist=!0,e(t.input).trigger("input").trigger("change"),t.changedValue=!1,t.triggeredByDatalist=!1),!0},scrollIntoView:function(t){var n,i=e("ul",this.shadowList),r=e("div.datalist-box",this.shadowList),o=t.position();return o.top-=(parseInt(i.css("paddingTop"),10)||0)+(parseInt(i.css("marginTop"),10)||0)+(parseInt(i.css("borderTopWidth"),10)||0),0>o.top?(r.scrollTop(r.scrollTop()+o.top-2),a):(o.top+=t.outerHeight(),n=r.height(),o.top>n&&r.scrollTop(r.scrollTop()+(o.top-n)+2),a)},changeValue:function(t){if(t[0]){var n,i=e("span.option-value",t).text(),a=e.prop(this.input,"value");i!=a&&(e(this.input).prop("value",i).triggerHandler("updateInput"),this.changedValue=!0,(n=e.data(this.input,"wsspinner"))&&n.setInput&&n.setInput(i))}},markItem:function(t,n,i){var a;i=i||e("li:not(.hidden-item)",this.shadowList),i.length&&(0>t?t=i.length-1:t>=i.length&&(t=0),i.removeClass("active-item"),this.shadowList.addClass("list-item-active"),a=i.filter(":eq("+t+")").addClass("active-item"),n&&(this.changeValue(a),this.scrollIntoView(a)),this.index=t)}})});