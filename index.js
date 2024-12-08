var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __pow = Math.pow;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var require_index = __commonJS({
  "index.js"(exports, module) {
    (function polyfill() {
      const relList = document.createElement("link").relList;
      if (relList && relList.supports && relList.supports("modulepreload")) {
        return;
      }
      for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
        processPreload(link);
      }
      new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type !== "childList") {
            continue;
          }
          for (const node of mutation.addedNodes) {
            if (node.tagName === "LINK" && node.rel === "modulepreload")
              processPreload(node);
          }
        }
      }).observe(document, { childList: true, subtree: true });
      function getFetchOpts(link) {
        const fetchOpts = {};
        if (link.integrity)
          fetchOpts.integrity = link.integrity;
        if (link.referrerPolicy)
          fetchOpts.referrerPolicy = link.referrerPolicy;
        if (link.crossOrigin === "use-credentials")
          fetchOpts.credentials = "include";
        else if (link.crossOrigin === "anonymous")
          fetchOpts.credentials = "omit";
        else
          fetchOpts.credentials = "same-origin";
        return fetchOpts;
      }
      function processPreload(link) {
        if (link.ep)
          return;
        link.ep = true;
        const fetchOpts = getFetchOpts(link);
        fetch(link.href, fetchOpts);
      }
    })();
    const common = "";
    const component = "";
    function noop() {
    }
    function assign$1(tar, src) {
      for (const k2 in src)
        tar[k2] = src[k2];
      return tar;
    }
    function run(fn) {
      return fn();
    }
    function blank_object() {
      return /* @__PURE__ */ Object.create(null);
    }
    function run_all(fns) {
      fns.forEach(run);
    }
    function is_function(thing) {
      return typeof thing === "function";
    }
    function safe_not_equal(a2, b2) {
      return a2 != a2 ? b2 == b2 : a2 !== b2 || (a2 && typeof a2 === "object" || typeof a2 === "function");
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
      if (!src_url_equal_anchor) {
        src_url_equal_anchor = document.createElement("a");
      }
      src_url_equal_anchor.href = url;
      return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
      return Object.keys(obj).length === 0;
    }
    function subscribe(store, ...callbacks) {
      if (store == null) {
        return noop;
      }
      const unsub = store.subscribe(...callbacks);
      return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component2, store, callback) {
      component2.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
      if (definition) {
        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
      }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
      return definition[1] && fn ? assign$1($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
      if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if ($$scope.dirty === void 0) {
          return lets;
        }
        if (typeof lets === "object") {
          const merged = [];
          const len = Math.max($$scope.dirty.length, lets.length);
          for (let i2 = 0; i2 < len; i2 += 1) {
            merged[i2] = $$scope.dirty[i2] | lets[i2];
          }
          return merged;
        }
        return $$scope.dirty | lets;
      }
      return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
      if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
      }
    }
    function get_all_dirty_from_scope($$scope) {
      if ($$scope.ctx.length > 32) {
        const dirty = [];
        const length = $$scope.ctx.length / 32;
        for (let i2 = 0; i2 < length; i2++) {
          dirty[i2] = -1;
        }
        return dirty;
      }
      return -1;
    }
    function exclude_internal_props(props) {
      const result = {};
      for (const k2 in props)
        if (k2[0] !== "$")
          result[k2] = props[k2];
      return result;
    }
    function compute_rest_props(props, keys) {
      const rest = {};
      keys = new Set(keys);
      for (const k2 in props)
        if (!keys.has(k2) && k2[0] !== "$")
          rest[k2] = props[k2];
      return rest;
    }
    function compute_slots(slots) {
      const result = {};
      for (const key in slots) {
        result[key] = true;
      }
      return result;
    }
    function set_store_value(store, ret, value) {
      store.set(value);
      return ret;
    }
    const contenteditable_truthy_values = ["", true, 1, "true", "contenteditable"];
    const globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
    function append(target, node) {
      target.appendChild(node);
    }
    function insert(target, node, anchor) {
      target.insertBefore(node, anchor || null);
    }
    function detach(node) {
      if (node.parentNode) {
        node.parentNode.removeChild(node);
      }
    }
    function destroy_each(iterations, detaching) {
      for (let i2 = 0; i2 < iterations.length; i2 += 1) {
        if (iterations[i2])
          iterations[i2].d(detaching);
      }
    }
    function element(name) {
      return document.createElement(name);
    }
    function svg_element(name) {
      return document.createElementNS("http://www.w3.org/2000/svg", name);
    }
    function text(data) {
      return document.createTextNode(data);
    }
    function space() {
      return text(" ");
    }
    function empty() {
      return text("");
    }
    function listen(node, event, handler, options) {
      node.addEventListener(event, handler, options);
      return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
      return function(event) {
        event.preventDefault();
        return fn.call(this, event);
      };
    }
    function stop_propagation(fn) {
      return function(event) {
        event.stopPropagation();
        return fn.call(this, event);
      };
    }
    function attr(node, attribute, value) {
      if (value == null)
        node.removeAttribute(attribute);
      else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
    }
    const always_set_through_set_attribute = ["width", "height"];
    function set_attributes(node, attributes) {
      const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
      for (const key in attributes) {
        if (attributes[key] == null) {
          node.removeAttribute(key);
        } else if (key === "style") {
          node.style.cssText = attributes[key];
        } else if (key === "__value") {
          node.value = node[key] = attributes[key];
        } else if (descriptors[key] && descriptors[key].set && always_set_through_set_attribute.indexOf(key) === -1) {
          node[key] = attributes[key];
        } else {
          attr(node, key, attributes[key]);
        }
      }
    }
    function children(element2) {
      return Array.from(element2.childNodes);
    }
    function set_data(text2, data) {
      data = "" + data;
      if (text2.data === data)
        return;
      text2.data = data;
    }
    function set_data_contenteditable(text2, data) {
      data = "" + data;
      if (text2.wholeText === data)
        return;
      text2.data = data;
    }
    function set_data_maybe_contenteditable(text2, data, attr_value) {
      if (~contenteditable_truthy_values.indexOf(attr_value)) {
        set_data_contenteditable(text2, data);
      } else {
        set_data(text2, data);
      }
    }
    function set_input_value(input, value) {
      input.value = value == null ? "" : value;
    }
    function set_style(node, key, value, important) {
      if (value == null) {
        node.style.removeProperty(key);
      } else {
        node.style.setProperty(key, value, important ? "important" : "");
      }
    }
    function toggle_class(element2, name, toggle) {
      element2.classList[toggle ? "add" : "remove"](name);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
      const e2 = document.createEvent("CustomEvent");
      e2.initCustomEvent(type, bubbles, cancelable, detail);
      return e2;
    }
    class HtmlTag {
      constructor(is_svg = false) {
        this.is_svg = false;
        this.is_svg = is_svg;
        this.e = this.n = null;
      }
      c(html2) {
        this.h(html2);
      }
      m(html2, target, anchor = null) {
        if (!this.e) {
          if (this.is_svg)
            this.e = svg_element(target.nodeName);
          else
            this.e = element(target.nodeType === 11 ? "TEMPLATE" : target.nodeName);
          this.t = target.tagName !== "TEMPLATE" ? target : target.content;
          this.c(html2);
        }
        this.i(anchor);
      }
      h(html2) {
        this.e.innerHTML = html2;
        this.n = Array.from(this.e.nodeName === "TEMPLATE" ? this.e.content.childNodes : this.e.childNodes);
      }
      i(anchor) {
        for (let i2 = 0; i2 < this.n.length; i2 += 1) {
          insert(this.t, this.n[i2], anchor);
        }
      }
      p(html2) {
        this.d();
        this.h(html2);
        this.i(this.a);
      }
      d() {
        this.n.forEach(detach);
      }
    }
    function construct_svelte_component(component2, props) {
      return new component2(props);
    }
    let current_component;
    function set_current_component(component2) {
      current_component = component2;
    }
    function get_current_component() {
      if (!current_component)
        throw new Error("Function called outside component initialization");
      return current_component;
    }
    function onMount(fn) {
      get_current_component().$$.on_mount.push(fn);
    }
    function afterUpdate(fn) {
      get_current_component().$$.after_update.push(fn);
    }
    function onDestroy(fn) {
      get_current_component().$$.on_destroy.push(fn);
    }
    function createEventDispatcher() {
      const component2 = get_current_component();
      return (type, detail, { cancelable = false } = {}) => {
        const callbacks = component2.$$.callbacks[type];
        if (callbacks) {
          const event = custom_event(type, detail, { cancelable });
          callbacks.slice().forEach((fn) => {
            fn.call(component2, event);
          });
          return !event.defaultPrevented;
        }
        return true;
      };
    }
    function bubble(component2, event) {
      const callbacks = component2.$$.callbacks[event.type];
      if (callbacks) {
        callbacks.slice().forEach((fn) => fn.call(this, event));
      }
    }
    const dirty_components = [];
    const binding_callbacks = [];
    let render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = /* @__PURE__ */ Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
      if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
      }
    }
    function tick() {
      schedule_update();
      return resolved_promise;
    }
    function add_render_callback(fn) {
      render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
      flush_callbacks.push(fn);
    }
    const seen_callbacks = /* @__PURE__ */ new Set();
    let flushidx = 0;
    function flush() {
      if (flushidx !== 0) {
        return;
      }
      const saved_component = current_component;
      do {
        try {
          while (flushidx < dirty_components.length) {
            const component2 = dirty_components[flushidx];
            flushidx++;
            set_current_component(component2);
            update(component2.$$);
          }
        } catch (e2) {
          dirty_components.length = 0;
          flushidx = 0;
          throw e2;
        }
        set_current_component(null);
        dirty_components.length = 0;
        flushidx = 0;
        while (binding_callbacks.length)
          binding_callbacks.pop()();
        for (let i2 = 0; i2 < render_callbacks.length; i2 += 1) {
          const callback = render_callbacks[i2];
          if (!seen_callbacks.has(callback)) {
            seen_callbacks.add(callback);
            callback();
          }
        }
        render_callbacks.length = 0;
      } while (dirty_components.length);
      while (flush_callbacks.length) {
        flush_callbacks.pop()();
      }
      update_scheduled = false;
      seen_callbacks.clear();
      set_current_component(saved_component);
    }
    function update($$) {
      if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
      }
    }
    function flush_render_callbacks(fns) {
      const filtered = [];
      const targets = [];
      render_callbacks.forEach((c2) => fns.indexOf(c2) === -1 ? filtered.push(c2) : targets.push(c2));
      targets.forEach((c2) => c2());
      render_callbacks = filtered;
    }
    const outroing = /* @__PURE__ */ new Set();
    let outros;
    function group_outros() {
      outros = {
        r: 0,
        c: [],
        p: outros
        // parent group
      };
    }
    function check_outros() {
      if (!outros.r) {
        run_all(outros.c);
      }
      outros = outros.p;
    }
    function transition_in(block, local) {
      if (block && block.i) {
        outroing.delete(block);
        block.i(local);
      }
    }
    function transition_out(block, local, detach2, callback) {
      if (block && block.o) {
        if (outroing.has(block))
          return;
        outroing.add(block);
        outros.c.push(() => {
          outroing.delete(block);
          if (callback) {
            if (detach2)
              block.d(1);
            callback();
          }
        });
        block.o(local);
      } else if (callback) {
        callback();
      }
    }
    function get_spread_update(levels, updates) {
      const update2 = {};
      const to_null_out = {};
      const accounted_for = { $$scope: 1 };
      let i2 = levels.length;
      while (i2--) {
        const o2 = levels[i2];
        const n2 = updates[i2];
        if (n2) {
          for (const key in o2) {
            if (!(key in n2))
              to_null_out[key] = 1;
          }
          for (const key in n2) {
            if (!accounted_for[key]) {
              update2[key] = n2[key];
              accounted_for[key] = 1;
            }
          }
          levels[i2] = n2;
        } else {
          for (const key in o2) {
            accounted_for[key] = 1;
          }
        }
      }
      for (const key in to_null_out) {
        if (!(key in update2))
          update2[key] = void 0;
      }
      return update2;
    }
    function get_spread_object(spread_props) {
      return typeof spread_props === "object" && spread_props !== null ? spread_props : {};
    }
    function bind(component2, name, callback) {
      const index = component2.$$.props[name];
      if (index !== void 0) {
        component2.$$.bound[index] = callback;
        callback(component2.$$.ctx[index]);
      }
    }
    function create_component(block) {
      block && block.c();
    }
    function mount_component(component2, target, anchor, customElement) {
      const { fragment, after_update } = component2.$$;
      fragment && fragment.m(target, anchor);
      if (!customElement) {
        add_render_callback(() => {
          const new_on_destroy = component2.$$.on_mount.map(run).filter(is_function);
          if (component2.$$.on_destroy) {
            component2.$$.on_destroy.push(...new_on_destroy);
          } else {
            run_all(new_on_destroy);
          }
          component2.$$.on_mount = [];
        });
      }
      after_update.forEach(add_render_callback);
    }
    function destroy_component(component2, detaching) {
      const $$ = component2.$$;
      if ($$.fragment !== null) {
        flush_render_callbacks($$.after_update);
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
      }
    }
    function make_dirty(component2, i2) {
      if (component2.$$.dirty[0] === -1) {
        dirty_components.push(component2);
        schedule_update();
        component2.$$.dirty.fill(0);
      }
      component2.$$.dirty[i2 / 31 | 0] |= 1 << i2 % 31;
    }
    function init$1(component2, options, instance2, create_fragment2, not_equal, props, append_styles, dirty = [-1]) {
      const parent_component = current_component;
      set_current_component(component2);
      const $$ = component2.$$ = {
        fragment: null,
        ctx: [],
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false,
        root: options.target || parent_component.$$.root
      };
      append_styles && append_styles($$.root);
      let ready = false;
      $$.ctx = instance2 ? instance2(component2, options.props || {}, (i2, ret, ...rest) => {
        const value = rest.length ? rest[0] : ret;
        if ($$.ctx && not_equal($$.ctx[i2], $$.ctx[i2] = value)) {
          if (!$$.skip_bound && $$.bound[i2])
            $$.bound[i2](value);
          if (ready)
            make_dirty(component2, i2);
        }
        return ret;
      }) : [];
      $$.update();
      ready = true;
      run_all($$.before_update);
      $$.fragment = create_fragment2 ? create_fragment2($$.ctx) : false;
      if (options.target) {
        if (options.hydrate) {
          const nodes = children(options.target);
          $$.fragment && $$.fragment.l(nodes);
          nodes.forEach(detach);
        } else {
          $$.fragment && $$.fragment.c();
        }
        if (options.intro)
          transition_in(component2.$$.fragment);
        mount_component(component2, options.target, options.anchor, options.customElement);
        flush();
      }
      set_current_component(parent_component);
    }
    class SvelteComponent {
      $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
      }
      $on(type, callback) {
        if (!is_function(callback)) {
          return noop;
        }
        const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
        callbacks.push(callback);
        return () => {
          const index = callbacks.indexOf(callback);
          if (index !== -1)
            callbacks.splice(index, 1);
        };
      }
      $set($$props) {
        if (this.$$set && !is_empty($$props)) {
          this.$$.skip_bound = true;
          this.$$set($$props);
          this.$$.skip_bound = false;
        }
      }
    }
    const subscriber_queue = [];
    function readable(value, start) {
      return {
        subscribe: writable(value, start).subscribe
      };
    }
    function writable(value, start = noop) {
      let stop;
      const subscribers = /* @__PURE__ */ new Set();
      function set(new_value) {
        if (safe_not_equal(value, new_value)) {
          value = new_value;
          if (stop) {
            const run_queue = !subscriber_queue.length;
            for (const subscriber of subscribers) {
              subscriber[1]();
              subscriber_queue.push(subscriber, value);
            }
            if (run_queue) {
              for (let i2 = 0; i2 < subscriber_queue.length; i2 += 2) {
                subscriber_queue[i2][0](subscriber_queue[i2 + 1]);
              }
              subscriber_queue.length = 0;
            }
          }
        }
      }
      function update2(fn) {
        set(fn(value));
      }
      function subscribe2(run2, invalidate = noop) {
        const subscriber = [run2, invalidate];
        subscribers.add(subscriber);
        if (subscribers.size === 1) {
          stop = start(set) || noop;
        }
        run2(value);
        return () => {
          subscribers.delete(subscriber);
          if (subscribers.size === 0 && stop) {
            stop();
            stop = null;
          }
        };
      }
      return { set, update: update2, subscribe: subscribe2 };
    }
    function derived(stores, fn, initial_value) {
      const single = !Array.isArray(stores);
      const stores_array = single ? [stores] : stores;
      const auto = fn.length < 2;
      return readable(initial_value, (set) => {
        let started = false;
        const values = [];
        let pending = 0;
        let cleanup = noop;
        const sync = () => {
          if (pending) {
            return;
          }
          cleanup();
          const result = fn(single ? values[0] : values, set);
          if (auto) {
            set(result);
          } else {
            cleanup = is_function(result) ? result : noop;
          }
        };
        const unsubscribers = stores_array.map((store, i2) => subscribe(store, (value) => {
          values[i2] = value;
          pending &= ~(1 << i2);
          if (started) {
            sync();
          }
        }, () => {
          pending |= 1 << i2;
        }));
        started = true;
        sync();
        return function stop() {
          run_all(unsubscribers);
          cleanup();
          started = false;
        };
      });
    }
    /*! js-cookie v3.0.5 | MIT */
    function assign(target) {
      for (var i2 = 1; i2 < arguments.length; i2++) {
        var source2 = arguments[i2];
        for (var key in source2) {
          target[key] = source2[key];
        }
      }
      return target;
    }
    var defaultConverter = {
      read: function(value) {
        if (value[0] === '"') {
          value = value.slice(1, -1);
        }
        return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
      },
      write: function(value) {
        return encodeURIComponent(value).replace(
          /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
          decodeURIComponent
        );
      }
    };
    function init(converter, defaultAttributes) {
      function set(name, value, attributes) {
        if (typeof document === "undefined") {
          return;
        }
        attributes = assign({}, defaultAttributes, attributes);
        if (typeof attributes.expires === "number") {
          attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
        }
        if (attributes.expires) {
          attributes.expires = attributes.expires.toUTCString();
        }
        name = encodeURIComponent(name).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
        var stringifiedAttributes = "";
        for (var attributeName in attributes) {
          if (!attributes[attributeName]) {
            continue;
          }
          stringifiedAttributes += "; " + attributeName;
          if (attributes[attributeName] === true) {
            continue;
          }
          stringifiedAttributes += "=" + attributes[attributeName].split(";")[0];
        }
        return document.cookie = name + "=" + converter.write(value, name) + stringifiedAttributes;
      }
      function get(name) {
        if (typeof document === "undefined" || arguments.length && !name) {
          return;
        }
        var cookies = document.cookie ? document.cookie.split("; ") : [];
        var jar = {};
        for (var i2 = 0; i2 < cookies.length; i2++) {
          var parts = cookies[i2].split("=");
          var value = parts.slice(1).join("=");
          try {
            var found = decodeURIComponent(parts[0]);
            jar[found] = converter.read(value, found);
            if (name === found) {
              break;
            }
          } catch (e2) {
          }
        }
        return name ? jar[name] : jar;
      }
      return Object.create(
        {
          set,
          get,
          remove: function(name, attributes) {
            set(
              name,
              "",
              assign({}, attributes, {
                expires: -1
              })
            );
          },
          withAttributes: function(attributes) {
            return init(this.converter, assign({}, this.attributes, attributes));
          },
          withConverter: function(converter2) {
            return init(assign({}, this.converter, converter2), this.attributes);
          }
        },
        {
          attributes: { value: Object.freeze(defaultAttributes) },
          converter: { value: Object.freeze(converter) }
        }
      );
    }
    var api$1 = init(defaultConverter, { path: "/" });
    const isSidebarFold = writable(false);
    const selectedMenu = writable("/app");
    const isLogin = writable(!!api$1.get("Authorization"));
    const user = writable(JSON.parse(api$1.get("user") || null));
    const toasts = writable([]);
    isLogin.subscribe((isLogin2) => {
      if (isLogin2) {
        return;
      }
      api$1.remove("Authorization");
      user.set(null);
    });
    user.subscribe((user2) => {
      if (user2) {
        api$1.set("user", JSON.stringify(user2), {
          expires: 0.5
        });
      } else {
        api$1.remove("user");
      }
    });
    const toast = {
      push: (toast2) => {
        toasts.update((toasts2) => toasts2.concat(toast2));
        setTimeout(() => {
          toasts.update((toasts2) => toasts2.slice(1));
        }, 2e3);
      },
      pop: (index) => toasts.update((toasts2) => toasts2.filter((_, i2) => i2 !== index))
    };
    function wrap(args) {
      if (!args) {
        throw Error("Parameter args is required");
      }
      if (!args.component == !args.asyncComponent) {
        throw Error("One and only one of component and asyncComponent is required");
      }
      if (args.component) {
        args.asyncComponent = () => Promise.resolve(args.component);
      }
      if (typeof args.asyncComponent != "function") {
        throw Error("Parameter asyncComponent must be a function");
      }
      if (args.conditions) {
        if (!Array.isArray(args.conditions)) {
          args.conditions = [args.conditions];
        }
        for (let i2 = 0; i2 < args.conditions.length; i2++) {
          if (!args.conditions[i2] || typeof args.conditions[i2] != "function") {
            throw Error("Invalid parameter conditions[" + i2 + "]");
          }
        }
      }
      if (args.loadingComponent) {
        args.asyncComponent.loading = args.loadingComponent;
        args.asyncComponent.loadingParams = args.loadingParams || void 0;
      }
      const obj = {
        component: args.asyncComponent,
        userData: args.userData,
        conditions: args.conditions && args.conditions.length ? args.conditions : void 0,
        props: args.props && Object.keys(args.props).length ? args.props : {},
        _sveltesparouter: true
      };
      return obj;
    }
    function parse(str, loose) {
      if (str instanceof RegExp)
        return { keys: false, pattern: str };
      var c2, o2, tmp, ext, keys = [], pattern = "", arr = str.split("/");
      arr[0] || arr.shift();
      while (tmp = arr.shift()) {
        c2 = tmp[0];
        if (c2 === "*") {
          keys.push("wild");
          pattern += "/(.*)";
        } else if (c2 === ":") {
          o2 = tmp.indexOf("?", 1);
          ext = tmp.indexOf(".", 1);
          keys.push(tmp.substring(1, !!~o2 ? o2 : !!~ext ? ext : tmp.length));
          pattern += !!~o2 && !~ext ? "(?:/([^/]+?))?" : "/([^/]+?)";
          if (!!~ext)
            pattern += (!!~o2 ? "?" : "") + "\\" + tmp.substring(ext);
        } else {
          pattern += "/" + tmp;
        }
      }
      return {
        keys,
        pattern: new RegExp("^" + pattern + (loose ? "(?=$|/)" : "/?$"), "i")
      };
    }
    function create_else_block$9(ctx) {
      let switch_instance;
      let switch_instance_anchor;
      let current;
      const switch_instance_spread_levels = [
        /*props*/
        ctx[2]
      ];
      var switch_value = (
        /*component*/
        ctx[0]
      );
      function switch_props(ctx2) {
        let switch_instance_props = {};
        for (let i2 = 0; i2 < switch_instance_spread_levels.length; i2 += 1) {
          switch_instance_props = assign$1(switch_instance_props, switch_instance_spread_levels[i2]);
        }
        return { props: switch_instance_props };
      }
      if (switch_value) {
        switch_instance = construct_svelte_component(switch_value, switch_props());
        switch_instance.$on(
          "routeEvent",
          /*routeEvent_handler_1*/
          ctx[7]
        );
      }
      return {
        c() {
          if (switch_instance)
            create_component(switch_instance.$$.fragment);
          switch_instance_anchor = empty();
        },
        m(target, anchor) {
          if (switch_instance)
            mount_component(switch_instance, target, anchor);
          insert(target, switch_instance_anchor, anchor);
          current = true;
        },
        p(ctx2, dirty) {
          const switch_instance_changes = dirty & /*props*/
          4 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(
            /*props*/
            ctx2[2]
          )]) : {};
          if (dirty & /*component*/
          1 && switch_value !== (switch_value = /*component*/
          ctx2[0])) {
            if (switch_instance) {
              group_outros();
              const old_component = switch_instance;
              transition_out(old_component.$$.fragment, 1, 0, () => {
                destroy_component(old_component, 1);
              });
              check_outros();
            }
            if (switch_value) {
              switch_instance = construct_svelte_component(switch_value, switch_props());
              switch_instance.$on(
                "routeEvent",
                /*routeEvent_handler_1*/
                ctx2[7]
              );
              create_component(switch_instance.$$.fragment);
              transition_in(switch_instance.$$.fragment, 1);
              mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
            } else {
              switch_instance = null;
            }
          } else if (switch_value) {
            switch_instance.$set(switch_instance_changes);
          }
        },
        i(local) {
          if (current)
            return;
          if (switch_instance)
            transition_in(switch_instance.$$.fragment, local);
          current = true;
        },
        o(local) {
          if (switch_instance)
            transition_out(switch_instance.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(switch_instance_anchor);
          if (switch_instance)
            destroy_component(switch_instance, detaching);
        }
      };
    }
    function create_if_block$g(ctx) {
      let switch_instance;
      let switch_instance_anchor;
      let current;
      const switch_instance_spread_levels = [
        { params: (
          /*componentParams*/
          ctx[1]
        ) },
        /*props*/
        ctx[2]
      ];
      var switch_value = (
        /*component*/
        ctx[0]
      );
      function switch_props(ctx2) {
        let switch_instance_props = {};
        for (let i2 = 0; i2 < switch_instance_spread_levels.length; i2 += 1) {
          switch_instance_props = assign$1(switch_instance_props, switch_instance_spread_levels[i2]);
        }
        return { props: switch_instance_props };
      }
      if (switch_value) {
        switch_instance = construct_svelte_component(switch_value, switch_props());
        switch_instance.$on(
          "routeEvent",
          /*routeEvent_handler*/
          ctx[6]
        );
      }
      return {
        c() {
          if (switch_instance)
            create_component(switch_instance.$$.fragment);
          switch_instance_anchor = empty();
        },
        m(target, anchor) {
          if (switch_instance)
            mount_component(switch_instance, target, anchor);
          insert(target, switch_instance_anchor, anchor);
          current = true;
        },
        p(ctx2, dirty) {
          const switch_instance_changes = dirty & /*componentParams, props*/
          6 ? get_spread_update(switch_instance_spread_levels, [
            dirty & /*componentParams*/
            2 && { params: (
              /*componentParams*/
              ctx2[1]
            ) },
            dirty & /*props*/
            4 && get_spread_object(
              /*props*/
              ctx2[2]
            )
          ]) : {};
          if (dirty & /*component*/
          1 && switch_value !== (switch_value = /*component*/
          ctx2[0])) {
            if (switch_instance) {
              group_outros();
              const old_component = switch_instance;
              transition_out(old_component.$$.fragment, 1, 0, () => {
                destroy_component(old_component, 1);
              });
              check_outros();
            }
            if (switch_value) {
              switch_instance = construct_svelte_component(switch_value, switch_props());
              switch_instance.$on(
                "routeEvent",
                /*routeEvent_handler*/
                ctx2[6]
              );
              create_component(switch_instance.$$.fragment);
              transition_in(switch_instance.$$.fragment, 1);
              mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
            } else {
              switch_instance = null;
            }
          } else if (switch_value) {
            switch_instance.$set(switch_instance_changes);
          }
        },
        i(local) {
          if (current)
            return;
          if (switch_instance)
            transition_in(switch_instance.$$.fragment, local);
          current = true;
        },
        o(local) {
          if (switch_instance)
            transition_out(switch_instance.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(switch_instance_anchor);
          if (switch_instance)
            destroy_component(switch_instance, detaching);
        }
      };
    }
    function create_fragment$L(ctx) {
      let current_block_type_index;
      let if_block;
      let if_block_anchor;
      let current;
      const if_block_creators = [create_if_block$g, create_else_block$9];
      const if_blocks = [];
      function select_block_type(ctx2, dirty) {
        if (
          /*componentParams*/
          ctx2[1]
        )
          return 0;
        return 1;
      }
      current_block_type_index = select_block_type(ctx);
      if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
      return {
        c() {
          if_block.c();
          if_block_anchor = empty();
        },
        m(target, anchor) {
          if_blocks[current_block_type_index].m(target, anchor);
          insert(target, if_block_anchor, anchor);
          current = true;
        },
        p(ctx2, [dirty]) {
          let previous_block_index = current_block_type_index;
          current_block_type_index = select_block_type(ctx2);
          if (current_block_type_index === previous_block_index) {
            if_blocks[current_block_type_index].p(ctx2, dirty);
          } else {
            group_outros();
            transition_out(if_blocks[previous_block_index], 1, 1, () => {
              if_blocks[previous_block_index] = null;
            });
            check_outros();
            if_block = if_blocks[current_block_type_index];
            if (!if_block) {
              if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
              if_block.c();
            } else {
              if_block.p(ctx2, dirty);
            }
            transition_in(if_block, 1);
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        },
        i(local) {
          if (current)
            return;
          transition_in(if_block);
          current = true;
        },
        o(local) {
          transition_out(if_block);
          current = false;
        },
        d(detaching) {
          if_blocks[current_block_type_index].d(detaching);
          if (detaching)
            detach(if_block_anchor);
        }
      };
    }
    function getLocation() {
      const hashPosition = window.location.href.indexOf("#/");
      let location2 = hashPosition > -1 ? window.location.href.substr(hashPosition + 1) : "/";
      const qsPosition = location2.indexOf("?");
      let querystring = "";
      if (qsPosition > -1) {
        querystring = location2.substr(qsPosition + 1);
        location2 = location2.substr(0, qsPosition);
      }
      return { location: location2, querystring };
    }
    const loc = readable(
      null,
      // eslint-disable-next-line prefer-arrow-callback
      function start(set) {
        set(getLocation());
        const update2 = () => {
          set(getLocation());
        };
        window.addEventListener("hashchange", update2, false);
        return function stop() {
          window.removeEventListener("hashchange", update2, false);
        };
      }
    );
    const location$1 = derived(loc, ($loc) => $loc.location);
    derived(loc, ($loc) => $loc.querystring);
    const params = writable(void 0);
    function push(location2) {
      return __async(this, null, function* () {
        if (!location2 || location2.length < 1 || location2.charAt(0) != "/" && location2.indexOf("#/") !== 0) {
          throw Error("Invalid parameter location");
        }
        yield tick();
        history.replaceState(
          __spreadProps(__spreadValues({}, history.state), {
            __svelte_spa_router_scrollX: window.scrollX,
            __svelte_spa_router_scrollY: window.scrollY
          }),
          void 0
        );
        window.location.hash = (location2.charAt(0) == "#" ? "" : "#") + location2;
      });
    }
    function restoreScroll(state) {
      if (state) {
        window.scrollTo(state.__svelte_spa_router_scrollX, state.__svelte_spa_router_scrollY);
      } else {
        window.scrollTo(0, 0);
      }
    }
    function instance$K($$self, $$props, $$invalidate) {
      let { routes: routes2 = {} } = $$props;
      let { prefix = "" } = $$props;
      let { restoreScrollState = false } = $$props;
      class RouteItem {
        /**
        * Initializes the object and creates a regular expression from the path, using regexparam.
        *
        * @param {string} path - Path to the route (must start with '/' or '*')
        * @param {SvelteComponent|WrappedComponent} component - Svelte component for the route, optionally wrapped
        */
        constructor(path, component3) {
          if (!component3 || typeof component3 != "function" && (typeof component3 != "object" || component3._sveltesparouter !== true)) {
            throw Error("Invalid component object");
          }
          if (!path || typeof path == "string" && (path.length < 1 || path.charAt(0) != "/" && path.charAt(0) != "*") || typeof path == "object" && !(path instanceof RegExp)) {
            throw Error('Invalid value for "path" argument - strings must start with / or *');
          }
          const { pattern, keys } = parse(path);
          this.path = path;
          if (typeof component3 == "object" && component3._sveltesparouter === true) {
            this.component = component3.component;
            this.conditions = component3.conditions || [];
            this.userData = component3.userData;
            this.props = component3.props || {};
          } else {
            this.component = () => Promise.resolve(component3);
            this.conditions = [];
            this.props = {};
          }
          this._pattern = pattern;
          this._keys = keys;
        }
        /**
        * Checks if `path` matches the current route.
        * If there's a match, will return the list of parameters from the URL (if any).
        * In case of no match, the method will return `null`.
        *
        * @param {string} path - Path to test
        * @returns {null|Object.<string, string>} List of paramters from the URL if there's a match, or `null` otherwise.
        */
        match(path) {
          if (prefix) {
            if (typeof prefix == "string") {
              if (path.startsWith(prefix)) {
                path = path.substr(prefix.length) || "/";
              } else {
                return null;
              }
            } else if (prefix instanceof RegExp) {
              const match = path.match(prefix);
              if (match && match[0]) {
                path = path.substr(match[0].length) || "/";
              } else {
                return null;
              }
            }
          }
          const matches = this._pattern.exec(path);
          if (matches === null) {
            return null;
          }
          if (this._keys === false) {
            return matches;
          }
          const out = {};
          let i2 = 0;
          while (i2 < this._keys.length) {
            try {
              out[this._keys[i2]] = decodeURIComponent(matches[i2 + 1] || "") || null;
            } catch (e2) {
              out[this._keys[i2]] = null;
            }
            i2++;
          }
          return out;
        }
        /**
        * Dictionary with route details passed to the pre-conditions functions, as well as the `routeLoading`, `routeLoaded` and `conditionsFailed` events
        * @typedef {Object} RouteDetail
        * @property {string|RegExp} route - Route matched as defined in the route definition (could be a string or a reguar expression object)
        * @property {string} location - Location path
        * @property {string} querystring - Querystring from the hash
        * @property {object} [userData] - Custom data passed by the user
        * @property {SvelteComponent} [component] - Svelte component (only in `routeLoaded` events)
        * @property {string} [name] - Name of the Svelte component (only in `routeLoaded` events)
        */
        /**
        * Executes all conditions (if any) to control whether the route can be shown. Conditions are executed in the order they are defined, and if a condition fails, the following ones aren't executed.
        * 
        * @param {RouteDetail} detail - Route detail
        * @returns {boolean} Returns true if all the conditions succeeded
        */
        checkConditions(detail) {
          return __async(this, null, function* () {
            for (let i2 = 0; i2 < this.conditions.length; i2++) {
              if (!(yield this.conditions[i2](detail))) {
                return false;
              }
            }
            return true;
          });
        }
      }
      const routesList = [];
      if (routes2 instanceof Map) {
        routes2.forEach((route2, path) => {
          routesList.push(new RouteItem(path, route2));
        });
      } else {
        Object.keys(routes2).forEach((path) => {
          routesList.push(new RouteItem(path, routes2[path]));
        });
      }
      let component2 = null;
      let componentParams = null;
      let props = {};
      const dispatch = createEventDispatcher();
      function dispatchNextTick(name, detail) {
        return __async(this, null, function* () {
          yield tick();
          dispatch(name, detail);
        });
      }
      let previousScrollState = null;
      let popStateChanged = null;
      if (restoreScrollState) {
        popStateChanged = (event) => {
          if (event.state && (event.state.__svelte_spa_router_scrollY || event.state.__svelte_spa_router_scrollX)) {
            previousScrollState = event.state;
          } else {
            previousScrollState = null;
          }
        };
        window.addEventListener("popstate", popStateChanged);
        afterUpdate(() => {
          restoreScroll(previousScrollState);
        });
      }
      let lastLoc = null;
      let componentObj = null;
      const unsubscribeLoc = loc.subscribe((newLoc) => __async(this, null, function* () {
        lastLoc = newLoc;
        let i2 = 0;
        while (i2 < routesList.length) {
          const match = routesList[i2].match(newLoc.location);
          if (!match) {
            i2++;
            continue;
          }
          const detail = {
            route: routesList[i2].path,
            location: newLoc.location,
            querystring: newLoc.querystring,
            userData: routesList[i2].userData,
            params: match && typeof match == "object" && Object.keys(match).length ? match : null
          };
          if (!(yield routesList[i2].checkConditions(detail))) {
            $$invalidate(0, component2 = null);
            componentObj = null;
            dispatchNextTick("conditionsFailed", detail);
            return;
          }
          dispatchNextTick("routeLoading", Object.assign({}, detail));
          const obj = routesList[i2].component;
          if (componentObj != obj) {
            if (obj.loading) {
              $$invalidate(0, component2 = obj.loading);
              componentObj = obj;
              $$invalidate(1, componentParams = obj.loadingParams);
              $$invalidate(2, props = {});
              dispatchNextTick("routeLoaded", Object.assign({}, detail, {
                component: component2,
                name: component2.name,
                params: componentParams
              }));
            } else {
              $$invalidate(0, component2 = null);
              componentObj = null;
            }
            const loaded = yield obj();
            if (newLoc != lastLoc) {
              return;
            }
            $$invalidate(0, component2 = loaded && loaded.default || loaded);
            componentObj = obj;
          }
          if (match && typeof match == "object" && Object.keys(match).length) {
            $$invalidate(1, componentParams = match);
          } else {
            $$invalidate(1, componentParams = null);
          }
          $$invalidate(2, props = routesList[i2].props);
          dispatchNextTick("routeLoaded", Object.assign({}, detail, {
            component: component2,
            name: component2.name,
            params: componentParams
          })).then(() => {
            params.set(componentParams);
          });
          return;
        }
        $$invalidate(0, component2 = null);
        componentObj = null;
        params.set(void 0);
      }));
      onDestroy(() => {
        unsubscribeLoc();
        popStateChanged && window.removeEventListener("popstate", popStateChanged);
      });
      function routeEvent_handler(event) {
        bubble.call(this, $$self, event);
      }
      function routeEvent_handler_1(event) {
        bubble.call(this, $$self, event);
      }
      $$self.$$set = ($$props2) => {
        if ("routes" in $$props2)
          $$invalidate(3, routes2 = $$props2.routes);
        if ("prefix" in $$props2)
          $$invalidate(4, prefix = $$props2.prefix);
        if ("restoreScrollState" in $$props2)
          $$invalidate(5, restoreScrollState = $$props2.restoreScrollState);
      };
      $$self.$$.update = () => {
        if ($$self.$$.dirty & /*restoreScrollState*/
        32) {
          history.scrollRestoration = restoreScrollState ? "manual" : "auto";
        }
      };
      return [
        component2,
        componentParams,
        props,
        routes2,
        prefix,
        restoreScrollState,
        routeEvent_handler,
        routeEvent_handler_1
      ];
    }
    class Router extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$K, create_fragment$L, safe_not_equal, {
          routes: 3,
          prefix: 4,
          restoreScrollState: 5
        });
      }
    }
    function create_fragment$K(ctx) {
      let div;
      let t0_value = (
        /*STATUS*/
        ctx[3][
          /*code*/
          ctx[0]
        ].text + ""
      );
      let t0;
      let br;
      let t1;
      let p2;
      let i2;
      let t2;
      let t3;
      let div_class_value;
      return {
        c() {
          div = element("div");
          t0 = text(t0_value);
          br = element("br");
          t1 = space();
          p2 = element("p");
          i2 = element("i");
          t2 = space();
          t3 = text(
            /*message*/
            ctx[1]
          );
          attr(i2, "class", "bi bi-envelope-exclamation-fill");
          attr(p2, "class", "fst-italic m-0");
          attr(div, "class", div_class_value = "alert alert-" + /*STATUS*/
          ctx[3][
            /*code*/
            ctx[0]
          ].type);
          attr(div, "role", "alert");
        },
        m(target, anchor) {
          insert(target, div, anchor);
          append(div, t0);
          append(div, br);
          append(div, t1);
          append(div, p2);
          append(p2, i2);
          append(p2, t2);
          append(p2, t3);
          ctx[6](div);
        },
        p(ctx2, [dirty]) {
          if (dirty & /*code*/
          1 && t0_value !== (t0_value = /*STATUS*/
          ctx2[3][
            /*code*/
            ctx2[0]
          ].text + ""))
            set_data(t0, t0_value);
          if (dirty & /*message*/
          2)
            set_data(
              t3,
              /*message*/
              ctx2[1]
            );
          if (dirty & /*code*/
          1 && div_class_value !== (div_class_value = "alert alert-" + /*STATUS*/
          ctx2[3][
            /*code*/
            ctx2[0]
          ].type)) {
            attr(div, "class", div_class_value);
          }
        },
        i: noop,
        o: noop,
        d(detaching) {
          if (detaching)
            detach(div);
          ctx[6](null);
        }
      };
    }
    function instance$J($$self, $$props, $$invalidate) {
      let { code } = $$props;
      let { text: text2 } = $$props;
      let { message = "" } = $$props;
      let { exposeTime = 3e3 } = $$props;
      let element2;
      const STATUS = {
        200: { type: "success", text: `${text2}되었습니다.` },
        400: { type: "danger", text: `${text2}에 실패했습니다.` },
        401: { type: "danger", text: `${text2}에 실패했습니다.` },
        402: { type: "danger", text: `${text2}에 실패했습니다.` },
        403: { type: "danger", text: `${text2}에 실패했습니다.` },
        404: { type: "danger", text: `${text2}에 실패했습니다.` }
      };
      onMount(() => {
        if (element2) {
          setTimeout(
            () => {
              element2.remove();
            },
            exposeTime
          );
        }
      });
      function div_binding($$value) {
        binding_callbacks[$$value ? "unshift" : "push"](() => {
          element2 = $$value;
          $$invalidate(2, element2);
        });
      }
      $$self.$$set = ($$props2) => {
        if ("code" in $$props2)
          $$invalidate(0, code = $$props2.code);
        if ("text" in $$props2)
          $$invalidate(4, text2 = $$props2.text);
        if ("message" in $$props2)
          $$invalidate(1, message = $$props2.message);
        if ("exposeTime" in $$props2)
          $$invalidate(5, exposeTime = $$props2.exposeTime);
      };
      return [code, message, element2, STATUS, text2, exposeTime, div_binding];
    }
    class Alert extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$J, create_fragment$K, safe_not_equal, {
          code: 0,
          text: 4,
          message: 1,
          exposeTime: 5
        });
      }
    }
    function create_fragment$J(ctx) {
      let button;
      let t2;
      let button_class_value;
      let current;
      let mounted;
      let dispose;
      const default_slot_template = (
        /*#slots*/
        ctx[10].default
      );
      const default_slot = create_slot(
        default_slot_template,
        ctx,
        /*$$scope*/
        ctx[9],
        null
      );
      let button_levels = [
        { type: "button" },
        {
          class: button_class_value = /*useDefaultClass*/
          (ctx[2] ? (
            /*defaultClass*/
            ctx[4]
          ) : "") + " " + /*classes*/
          ctx[3]
        },
        { disabled: (
          /*disabled*/
          ctx[1]
        ) },
        /*$$restProps*/
        ctx[5]
      ];
      let button_data = {};
      for (let i2 = 0; i2 < button_levels.length; i2 += 1) {
        button_data = assign$1(button_data, button_levels[i2]);
      }
      return {
        c() {
          button = element("button");
          t2 = text(
            /*text*/
            ctx[0]
          );
          if (default_slot)
            default_slot.c();
          set_attributes(button, button_data);
        },
        m(target, anchor) {
          insert(target, button, anchor);
          append(button, t2);
          if (default_slot) {
            default_slot.m(button, null);
          }
          if (button.autofocus)
            button.focus();
          current = true;
          if (!mounted) {
            dispose = listen(
              button,
              "click",
              /*click_handler*/
              ctx[11]
            );
            mounted = true;
          }
        },
        p(ctx2, [dirty]) {
          if (!current || dirty & /*text*/
          1)
            set_data_maybe_contenteditable(
              t2,
              /*text*/
              ctx2[0],
              button_data["contenteditable"]
            );
          if (default_slot) {
            if (default_slot.p && (!current || dirty & /*$$scope*/
            512)) {
              update_slot_base(
                default_slot,
                default_slot_template,
                ctx2,
                /*$$scope*/
                ctx2[9],
                !current ? get_all_dirty_from_scope(
                  /*$$scope*/
                  ctx2[9]
                ) : get_slot_changes(
                  default_slot_template,
                  /*$$scope*/
                  ctx2[9],
                  dirty,
                  null
                ),
                null
              );
            }
          }
          set_attributes(button, button_data = get_spread_update(button_levels, [
            { type: "button" },
            (!current || dirty & /*useDefaultClass, classes*/
            12 && button_class_value !== (button_class_value = /*useDefaultClass*/
            (ctx2[2] ? (
              /*defaultClass*/
              ctx2[4]
            ) : "") + " " + /*classes*/
            ctx2[3])) && { class: button_class_value },
            (!current || dirty & /*disabled*/
            2) && { disabled: (
              /*disabled*/
              ctx2[1]
            ) },
            dirty & /*$$restProps*/
            32 && /*$$restProps*/
            ctx2[5]
          ]));
        },
        i(local) {
          if (current)
            return;
          transition_in(default_slot, local);
          current = true;
        },
        o(local) {
          transition_out(default_slot, local);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(button);
          if (default_slot)
            default_slot.d(detaching);
          mounted = false;
          dispose();
        }
      };
    }
    function instance$I($$self, $$props, $$invalidate) {
      const omit_props_names = ["type", "text", "disabled", "width", "fill", "useDefaultClass", "classes"];
      let $$restProps = compute_rest_props($$props, omit_props_names);
      let { $$slots: slots = {}, $$scope } = $$props;
      let { type = "4" } = $$props;
      let { text: text2 = "button" } = $$props;
      let { disabled = false } = $$props;
      let { width = "" } = $$props;
      let { fill = false } = $$props;
      let { useDefaultClass = true } = $$props;
      let { classes = "" } = $$props;
      const defaultClass = `btn btn${fill ? "-fill" : ""}-grey${type} ${width ? `w-${width}` : ""}`;
      function click_handler2(event) {
        bubble.call(this, $$self, event);
      }
      $$self.$$set = ($$new_props) => {
        $$props = assign$1(assign$1({}, $$props), exclude_internal_props($$new_props));
        $$invalidate(5, $$restProps = compute_rest_props($$props, omit_props_names));
        if ("type" in $$new_props)
          $$invalidate(6, type = $$new_props.type);
        if ("text" in $$new_props)
          $$invalidate(0, text2 = $$new_props.text);
        if ("disabled" in $$new_props)
          $$invalidate(1, disabled = $$new_props.disabled);
        if ("width" in $$new_props)
          $$invalidate(7, width = $$new_props.width);
        if ("fill" in $$new_props)
          $$invalidate(8, fill = $$new_props.fill);
        if ("useDefaultClass" in $$new_props)
          $$invalidate(2, useDefaultClass = $$new_props.useDefaultClass);
        if ("classes" in $$new_props)
          $$invalidate(3, classes = $$new_props.classes);
        if ("$$scope" in $$new_props)
          $$invalidate(9, $$scope = $$new_props.$$scope);
      };
      return [
        text2,
        disabled,
        useDefaultClass,
        classes,
        defaultClass,
        $$restProps,
        type,
        width,
        fill,
        $$scope,
        slots,
        click_handler2
      ];
    }
    class Button extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$I, create_fragment$J, safe_not_equal, {
          type: 6,
          text: 0,
          disabled: 1,
          width: 7,
          fill: 8,
          useDefaultClass: 2,
          classes: 3
        });
      }
    }
    function get_each_context$b(ctx, list, i2) {
      const child_ctx = ctx.slice();
      child_ctx[5] = list[i2];
      child_ctx[7] = i2;
      return child_ctx;
    }
    function create_if_block$f(ctx) {
      let label;
      let t_value = (
        /*option*/
        ctx[5] + ""
      );
      let t2;
      let label_for_value;
      return {
        c() {
          label = element("label");
          t2 = text(t_value);
          attr(label, "class", "form-check-label");
          attr(label, "for", label_for_value = "" + /*id*/
          (ctx[1] + /*idx*/
          (ctx[7] + 1)));
        },
        m(target, anchor) {
          insert(target, label, anchor);
          append(label, t2);
        },
        p(ctx2, dirty) {
          if (dirty & /*options*/
          8 && t_value !== (t_value = /*option*/
          ctx2[5] + ""))
            set_data(t2, t_value);
          if (dirty & /*id*/
          2 && label_for_value !== (label_for_value = "" + /*id*/
          (ctx2[1] + /*idx*/
          (ctx2[7] + 1)))) {
            attr(label, "for", label_for_value);
          }
        },
        d(detaching) {
          if (detaching)
            detach(label);
        }
      };
    }
    function create_each_block$b(ctx) {
      let div;
      let input;
      let input_id_value;
      let input_checked_value;
      let t0;
      let t1;
      let div_class_value;
      let mounted;
      let dispose;
      function click_handler2() {
        return (
          /*click_handler*/
          ctx[4](
            /*option*/
            ctx[5]
          )
        );
      }
      let if_block = (
        /*option*/
        ctx[5] && create_if_block$f(ctx)
      );
      return {
        c() {
          div = element("div");
          input = element("input");
          t0 = space();
          if (if_block)
            if_block.c();
          t1 = space();
          attr(input, "class", "form-check-input");
          attr(input, "type", "checkbox");
          input.value = "";
          attr(input, "id", input_id_value = "" + /*id*/
          (ctx[1] + /*idx*/
          (ctx[7] + 1)));
          input.checked = input_checked_value = /*value*/
          ctx[0].indexOf(
            /*option*/
            ctx[5]
          ) !== -1;
          attr(div, "class", div_class_value = "form-check" + /*inline*/
          (ctx[2] ? "-inline" : ""));
        },
        m(target, anchor) {
          insert(target, div, anchor);
          append(div, input);
          append(div, t0);
          if (if_block)
            if_block.m(div, null);
          append(div, t1);
          if (!mounted) {
            dispose = listen(input, "click", click_handler2);
            mounted = true;
          }
        },
        p(new_ctx, dirty) {
          ctx = new_ctx;
          if (dirty & /*id*/
          2 && input_id_value !== (input_id_value = "" + /*id*/
          (ctx[1] + /*idx*/
          (ctx[7] + 1)))) {
            attr(input, "id", input_id_value);
          }
          if (dirty & /*value, options*/
          9 && input_checked_value !== (input_checked_value = /*value*/
          ctx[0].indexOf(
            /*option*/
            ctx[5]
          ) !== -1)) {
            input.checked = input_checked_value;
          }
          if (
            /*option*/
            ctx[5]
          ) {
            if (if_block) {
              if_block.p(ctx, dirty);
            } else {
              if_block = create_if_block$f(ctx);
              if_block.c();
              if_block.m(div, t1);
            }
          } else if (if_block) {
            if_block.d(1);
            if_block = null;
          }
          if (dirty & /*inline*/
          4 && div_class_value !== (div_class_value = "form-check" + /*inline*/
          (ctx[2] ? "-inline" : ""))) {
            attr(div, "class", div_class_value);
          }
        },
        d(detaching) {
          if (detaching)
            detach(div);
          if (if_block)
            if_block.d();
          mounted = false;
          dispose();
        }
      };
    }
    function create_fragment$I(ctx) {
      let each_1_anchor;
      let each_value = (
        /*options*/
        ctx[3]
      );
      let each_blocks = [];
      for (let i2 = 0; i2 < each_value.length; i2 += 1) {
        each_blocks[i2] = create_each_block$b(get_each_context$b(ctx, each_value, i2));
      }
      return {
        c() {
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            each_blocks[i2].c();
          }
          each_1_anchor = empty();
        },
        m(target, anchor) {
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            if (each_blocks[i2]) {
              each_blocks[i2].m(target, anchor);
            }
          }
          insert(target, each_1_anchor, anchor);
        },
        p(ctx2, [dirty]) {
          if (dirty & /*inline, id, options, value*/
          15) {
            each_value = /*options*/
            ctx2[3];
            let i2;
            for (i2 = 0; i2 < each_value.length; i2 += 1) {
              const child_ctx = get_each_context$b(ctx2, each_value, i2);
              if (each_blocks[i2]) {
                each_blocks[i2].p(child_ctx, dirty);
              } else {
                each_blocks[i2] = create_each_block$b(child_ctx);
                each_blocks[i2].c();
                each_blocks[i2].m(each_1_anchor.parentNode, each_1_anchor);
              }
            }
            for (; i2 < each_blocks.length; i2 += 1) {
              each_blocks[i2].d(1);
            }
            each_blocks.length = each_value.length;
          }
        },
        i: noop,
        o: noop,
        d(detaching) {
          destroy_each(each_blocks, detaching);
          if (detaching)
            detach(each_1_anchor);
        }
      };
    }
    function instance$H($$self, $$props, $$invalidate) {
      let { id = "" } = $$props;
      let { inline = false } = $$props;
      let { options = [] } = $$props;
      let { value = [] } = $$props;
      const click_handler2 = (option) => {
        if (value.indexOf(option) === -1) {
          value.push(option);
        } else {
          value.splice(value.indexOf(option), 1);
        }
        $$invalidate(0, value);
      };
      $$self.$$set = ($$props2) => {
        if ("id" in $$props2)
          $$invalidate(1, id = $$props2.id);
        if ("inline" in $$props2)
          $$invalidate(2, inline = $$props2.inline);
        if ("options" in $$props2)
          $$invalidate(3, options = $$props2.options);
        if ("value" in $$props2)
          $$invalidate(0, value = $$props2.value);
      };
      return [value, id, inline, options, click_handler2];
    }
    class Checkbox extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$H, create_fragment$I, safe_not_equal, { id: 1, inline: 2, options: 3, value: 0 });
      }
    }
    function create_fragment$H(ctx) {
      let input;
      let mounted;
      let dispose;
      let input_levels = [
        { type: (
          /*type*/
          ctx[4]
        ) },
        { class: (
          /*classes*/
          ctx[3]
        ) },
        { value: (
          /*value*/
          ctx[0]
        ) },
        { id: (
          /*id*/
          ctx[1]
        ) },
        { disabled: (
          /*disabled*/
          ctx[2]
        ) },
        /*$$restProps*/
        ctx[8],
        { min: (
          /*min*/
          ctx[5]
        ) },
        { placeholder: (
          /*placeholder*/
          ctx[6]
        ) }
      ];
      let input_data = {};
      for (let i2 = 0; i2 < input_levels.length; i2 += 1) {
        input_data = assign$1(input_data, input_levels[i2]);
      }
      return {
        c() {
          input = element("input");
          set_attributes(input, input_data);
        },
        m(target, anchor) {
          insert(target, input, anchor);
          if ("value" in input_data) {
            input.value = input_data.value;
          }
          if (input.autofocus)
            input.focus();
          if (!mounted) {
            dispose = listen(
              input,
              "input",
              /*handleInput*/
              ctx[7]
            );
            mounted = true;
          }
        },
        p(ctx2, [dirty]) {
          set_attributes(input, input_data = get_spread_update(input_levels, [
            dirty & /*type*/
            16 && { type: (
              /*type*/
              ctx2[4]
            ) },
            dirty & /*classes*/
            8 && { class: (
              /*classes*/
              ctx2[3]
            ) },
            dirty & /*value*/
            1 && input.value !== /*value*/
            ctx2[0] && { value: (
              /*value*/
              ctx2[0]
            ) },
            dirty & /*id*/
            2 && { id: (
              /*id*/
              ctx2[1]
            ) },
            dirty & /*disabled*/
            4 && { disabled: (
              /*disabled*/
              ctx2[2]
            ) },
            dirty & /*$$restProps*/
            256 && /*$$restProps*/
            ctx2[8],
            dirty & /*min*/
            32 && { min: (
              /*min*/
              ctx2[5]
            ) },
            dirty & /*placeholder*/
            64 && { placeholder: (
              /*placeholder*/
              ctx2[6]
            ) }
          ]));
          if ("value" in input_data) {
            input.value = input_data.value;
          }
        },
        i: noop,
        o: noop,
        d(detaching) {
          if (detaching)
            detach(input);
          mounted = false;
          dispose();
        }
      };
    }
    function instance$G($$self, $$props, $$invalidate) {
      const omit_props_names = [
        "id",
        "value",
        "disabled",
        "classes",
        "type",
        "removeInValid",
        "min",
        "placeholder",
        "onUpdate"
      ];
      let $$restProps = compute_rest_props($$props, omit_props_names);
      let { id = "" } = $$props;
      let { value = "" } = $$props;
      let { disabled = false } = $$props;
      let { classes = "form-control" } = $$props;
      let { type = "text" } = $$props;
      let { removeInValid = false } = $$props;
      let { min = "" } = $$props;
      let { placeholder = "" } = $$props;
      let { onUpdate = () => {
      } } = $$props;
      const handleInput = (e2) => {
        $$invalidate(0, value = type.match(/^(number|range)$/) ? +e2.target.value : e2.target.value);
        onUpdate(id, value);
        removeInValid && e2.target.classList.remove("is-invalid");
      };
      $$self.$$set = ($$new_props) => {
        $$props = assign$1(assign$1({}, $$props), exclude_internal_props($$new_props));
        $$invalidate(8, $$restProps = compute_rest_props($$props, omit_props_names));
        if ("id" in $$new_props)
          $$invalidate(1, id = $$new_props.id);
        if ("value" in $$new_props)
          $$invalidate(0, value = $$new_props.value);
        if ("disabled" in $$new_props)
          $$invalidate(2, disabled = $$new_props.disabled);
        if ("classes" in $$new_props)
          $$invalidate(3, classes = $$new_props.classes);
        if ("type" in $$new_props)
          $$invalidate(4, type = $$new_props.type);
        if ("removeInValid" in $$new_props)
          $$invalidate(9, removeInValid = $$new_props.removeInValid);
        if ("min" in $$new_props)
          $$invalidate(5, min = $$new_props.min);
        if ("placeholder" in $$new_props)
          $$invalidate(6, placeholder = $$new_props.placeholder);
        if ("onUpdate" in $$new_props)
          $$invalidate(10, onUpdate = $$new_props.onUpdate);
      };
      return [
        value,
        id,
        disabled,
        classes,
        type,
        min,
        placeholder,
        handleInput,
        $$restProps,
        removeInValid,
        onUpdate
      ];
    }
    let Input$1 = class Input extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$G, create_fragment$H, safe_not_equal, {
          id: 1,
          value: 0,
          disabled: 2,
          classes: 3,
          type: 4,
          removeInValid: 9,
          min: 5,
          placeholder: 6,
          onUpdate: 10
        });
      }
    };
    const Dropdown_svelte_svelte_type_style_lang = "";
    function get_each_context$a(ctx, list, i2) {
      const child_ctx = ctx.slice();
      child_ctx[15] = list[i2];
      return child_ctx;
    }
    function create_if_block$e(ctx) {
      let input;
      let updating_value;
      let current;
      function input_value_binding(value) {
        ctx[13](value);
      }
      let input_props = {
        type: "text",
        onUpdate: (
          /*filteringItem*/
          ctx[9]
        )
      };
      if (
        /*filterKey*/
        ctx[4] !== void 0
      ) {
        input_props.value = /*filterKey*/
        ctx[4];
      }
      input = new Input$1({ props: input_props });
      binding_callbacks.push(() => bind(input, "value", input_value_binding));
      return {
        c() {
          create_component(input.$$.fragment);
        },
        m(target, anchor) {
          mount_component(input, target, anchor);
          current = true;
        },
        p(ctx2, dirty) {
          const input_changes = {};
          if (!updating_value && dirty & /*filterKey*/
          16) {
            updating_value = true;
            input_changes.value = /*filterKey*/
            ctx2[4];
            add_flush_callback(() => updating_value = false);
          }
          input.$set(input_changes);
        },
        i(local) {
          if (current)
            return;
          transition_in(input.$$.fragment, local);
          current = true;
        },
        o(local) {
          transition_out(input.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          destroy_component(input, detaching);
        }
      };
    }
    function create_each_block$a(ctx) {
      let li;
      let span;
      let t0_value = (
        /*option*/
        ctx[15] + ""
      );
      let t0;
      let t1;
      let mounted;
      let dispose;
      function click_handler2() {
        return (
          /*click_handler*/
          ctx[14](
            /*option*/
            ctx[15]
          )
        );
      }
      return {
        c() {
          li = element("li");
          span = element("span");
          t0 = text(t0_value);
          t1 = space();
          attr(span, "class", "dropdown-item svelte-1ckr7fg");
        },
        m(target, anchor) {
          insert(target, li, anchor);
          append(li, span);
          append(span, t0);
          append(li, t1);
          if (!mounted) {
            dispose = [
              listen(
                span,
                "click",
                /*onClickItem*/
                ctx[8]
              ),
              listen(li, "click", click_handler2)
            ];
            mounted = true;
          }
        },
        p(new_ctx, dirty) {
          ctx = new_ctx;
          if (dirty & /*filterOptions*/
          4 && t0_value !== (t0_value = /*option*/
          ctx[15] + ""))
            set_data(t0, t0_value);
        },
        d(detaching) {
          if (detaching)
            detach(li);
          mounted = false;
          run_all(dispose);
        }
      };
    }
    function create_fragment$G(ctx) {
      let div;
      let button;
      let t0_value = (
        /*value*/
        (ctx[0] || /*defaultValue*/
        ctx[1]) + ""
      );
      let t0;
      let t1;
      let ul;
      let t2;
      let current;
      let mounted;
      let dispose;
      let if_block = (
        /*filter*/
        ctx[5] && create_if_block$e(ctx)
      );
      let each_value = (
        /*filterOptions*/
        ctx[2]
      );
      let each_blocks = [];
      for (let i2 = 0; i2 < each_value.length; i2 += 1) {
        each_blocks[i2] = create_each_block$a(get_each_context$a(ctx, each_value, i2));
      }
      return {
        c() {
          div = element("div");
          button = element("button");
          t0 = text(t0_value);
          t1 = space();
          ul = element("ul");
          if (if_block)
            if_block.c();
          t2 = space();
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            each_blocks[i2].c();
          }
          attr(button, "class", "btn dropdown-toggle btn-outline");
          attr(button, "type", "button");
          attr(button, "data-bs-toggle", "dropdown");
          attr(
            button,
            "aria-expanded",
            /*expanded*/
            ctx[3]
          );
          attr(ul, "class", "dropdown-menu svelte-1ckr7fg");
          set_style(
            ul,
            "display",
            /*expanded*/
            ctx[3] ? "block" : "none"
          );
          attr(div, "class", "btn-group");
        },
        m(target, anchor) {
          insert(target, div, anchor);
          append(div, button);
          append(button, t0);
          append(div, t1);
          append(div, ul);
          if (if_block)
            if_block.m(ul, null);
          append(ul, t2);
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            if (each_blocks[i2]) {
              each_blocks[i2].m(ul, null);
            }
          }
          current = true;
          if (!mounted) {
            dispose = listen(
              button,
              "click",
              /*onClickButton*/
              ctx[7]
            );
            mounted = true;
          }
        },
        p(ctx2, [dirty]) {
          if ((!current || dirty & /*value, defaultValue*/
          3) && t0_value !== (t0_value = /*value*/
          (ctx2[0] || /*defaultValue*/
          ctx2[1]) + ""))
            set_data(t0, t0_value);
          if (!current || dirty & /*expanded*/
          8) {
            attr(
              button,
              "aria-expanded",
              /*expanded*/
              ctx2[3]
            );
          }
          if (
            /*filter*/
            ctx2[5]
          )
            if_block.p(ctx2, dirty);
          if (dirty & /*updateValue, filterOptions, onClickItem*/
          324) {
            each_value = /*filterOptions*/
            ctx2[2];
            let i2;
            for (i2 = 0; i2 < each_value.length; i2 += 1) {
              const child_ctx = get_each_context$a(ctx2, each_value, i2);
              if (each_blocks[i2]) {
                each_blocks[i2].p(child_ctx, dirty);
              } else {
                each_blocks[i2] = create_each_block$a(child_ctx);
                each_blocks[i2].c();
                each_blocks[i2].m(ul, null);
              }
            }
            for (; i2 < each_blocks.length; i2 += 1) {
              each_blocks[i2].d(1);
            }
            each_blocks.length = each_value.length;
          }
          if (!current || dirty & /*expanded*/
          8) {
            set_style(
              ul,
              "display",
              /*expanded*/
              ctx2[3] ? "block" : "none"
            );
          }
        },
        i(local) {
          if (current)
            return;
          transition_in(if_block);
          current = true;
        },
        o(local) {
          transition_out(if_block);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(div);
          if (if_block)
            if_block.d();
          destroy_each(each_blocks, detaching);
          mounted = false;
          dispose();
        }
      };
    }
    function instance$F($$self, $$props, $$invalidate) {
      let { options = [] } = $$props;
      let { value = "" } = $$props;
      let { defaultValue = "option" } = $$props;
      let { key = "" } = $$props;
      let filter = options.length > 10;
      let filterOptions = options;
      let { changedValue = () => {
      } } = $$props;
      let expanded = false;
      let filterKey = "";
      function updateValue(option) {
        $$invalidate(0, value = option);
        changedValue(key, value);
      }
      function onClickButton() {
        $$invalidate(3, expanded = !expanded);
      }
      function onClickItem() {
        $$invalidate(3, expanded = false);
      }
      function filteringItem(id, item) {
        $$invalidate(4, filterKey = item);
        $$invalidate(2, filterOptions = options.filter((option) => option.toLowerCase().includes(filterKey.toLowerCase())));
      }
      function input_value_binding(value2) {
        filterKey = value2;
        $$invalidate(4, filterKey);
      }
      const click_handler2 = (option) => {
        updateValue(option);
      };
      $$self.$$set = ($$props2) => {
        if ("options" in $$props2)
          $$invalidate(10, options = $$props2.options);
        if ("value" in $$props2)
          $$invalidate(0, value = $$props2.value);
        if ("defaultValue" in $$props2)
          $$invalidate(1, defaultValue = $$props2.defaultValue);
        if ("key" in $$props2)
          $$invalidate(11, key = $$props2.key);
        if ("changedValue" in $$props2)
          $$invalidate(12, changedValue = $$props2.changedValue);
      };
      $$self.$$.update = () => {
        if ($$self.$$.dirty & /*options*/
        1024) {
          (() => {
            $$invalidate(2, filterOptions = options);
          })();
        }
      };
      return [
        value,
        defaultValue,
        filterOptions,
        expanded,
        filterKey,
        filter,
        updateValue,
        onClickButton,
        onClickItem,
        filteringItem,
        options,
        key,
        changedValue,
        input_value_binding,
        click_handler2
      ];
    }
    class Dropdown extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$F, create_fragment$G, safe_not_equal, {
          options: 10,
          value: 0,
          defaultValue: 1,
          key: 11,
          changedValue: 12
        });
      }
    }
    const get_btn_slot_changes = (dirty) => ({});
    const get_btn_slot_context = (ctx) => ({});
    function create_else_block$8(ctx) {
      let t0;
      let t1;
      return {
        c() {
          t0 = text(
            /*label*/
            ctx[4]
          );
          t1 = space();
        },
        m(target, anchor) {
          insert(target, t0, anchor);
          insert(target, t1, anchor);
        },
        p: noop,
        d(detaching) {
          if (detaching)
            detach(t0);
          if (detaching)
            detach(t1);
        }
      };
    }
    function create_if_block$d(ctx) {
      let span;
      let t1;
      return {
        c() {
          span = element("span");
          span.textContent = `${/*label*/
          ctx[4]}`;
          t1 = space();
        },
        m(target, anchor) {
          insert(target, span, anchor);
          insert(target, t1, anchor);
        },
        p: noop,
        d(detaching) {
          if (detaching)
            detach(span);
          if (detaching)
            detach(t1);
        }
      };
    }
    function create_fragment$F(ctx) {
      let label_1;
      let if_block_anchor;
      let current;
      let mounted;
      let dispose;
      function select_block_type(ctx2, dirty) {
        if (
          /*hover*/
          ctx2[1]
        )
          return create_if_block$d;
        return create_else_block$8;
      }
      let current_block_type = select_block_type(ctx);
      let if_block = current_block_type(ctx);
      const btn_slot_template = (
        /*#slots*/
        ctx[7].btn
      );
      const btn_slot = create_slot(
        btn_slot_template,
        ctx,
        /*$$scope*/
        ctx[6],
        get_btn_slot_context
      );
      return {
        c() {
          label_1 = element("label");
          if_block.c();
          if_block_anchor = empty();
          if (btn_slot)
            btn_slot.c();
          attr(
            label_1,
            "for",
            /*id*/
            ctx[0]
          );
          attr(label_1, "class", "col-form-label " + /*fw*/
          ctx[3] + " " + /*classes*/
          ctx[2]);
        },
        m(target, anchor) {
          insert(target, label_1, anchor);
          if_block.m(label_1, null);
          append(label_1, if_block_anchor);
          if (btn_slot) {
            btn_slot.m(label_1, null);
          }
          current = true;
          if (!mounted) {
            dispose = [
              listen(
                label_1,
                "mouseover",
                /*mouseover_handler*/
                ctx[8]
              ),
              listen(
                label_1,
                "mouseout",
                /*mouseout_handler*/
                ctx[9]
              ),
              listen(
                label_1,
                "click",
                /*click_handler*/
                ctx[10]
              )
            ];
            mounted = true;
          }
        },
        p(ctx2, [dirty]) {
          if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block) {
            if_block.p(ctx2, dirty);
          } else {
            if_block.d(1);
            if_block = current_block_type(ctx2);
            if (if_block) {
              if_block.c();
              if_block.m(label_1, if_block_anchor);
            }
          }
          if (btn_slot) {
            if (btn_slot.p && (!current || dirty & /*$$scope*/
            64)) {
              update_slot_base(
                btn_slot,
                btn_slot_template,
                ctx2,
                /*$$scope*/
                ctx2[6],
                !current ? get_all_dirty_from_scope(
                  /*$$scope*/
                  ctx2[6]
                ) : get_slot_changes(
                  btn_slot_template,
                  /*$$scope*/
                  ctx2[6],
                  dirty,
                  get_btn_slot_changes
                ),
                get_btn_slot_context
              );
            }
          }
          if (!current || dirty & /*id*/
          1) {
            attr(
              label_1,
              "for",
              /*id*/
              ctx2[0]
            );
          }
        },
        i(local) {
          if (current)
            return;
          transition_in(btn_slot, local);
          current = true;
        },
        o(local) {
          transition_out(btn_slot, local);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(label_1);
          if_block.d();
          if (btn_slot)
            btn_slot.d(detaching);
          mounted = false;
          run_all(dispose);
        }
      };
    }
    function instance$E($$self, $$props, $$invalidate) {
      let { $$slots: slots = {}, $$scope } = $$props;
      let { id } = $$props;
      let { hover = false } = $$props;
      let { options = {} } = $$props;
      const { classes = "", fw = "fw-bolder", label } = options;
      function mouseover_handler(event) {
        bubble.call(this, $$self, event);
      }
      function mouseout_handler(event) {
        bubble.call(this, $$self, event);
      }
      function click_handler2(event) {
        bubble.call(this, $$self, event);
      }
      $$self.$$set = ($$props2) => {
        if ("id" in $$props2)
          $$invalidate(0, id = $$props2.id);
        if ("hover" in $$props2)
          $$invalidate(1, hover = $$props2.hover);
        if ("options" in $$props2)
          $$invalidate(5, options = $$props2.options);
        if ("$$scope" in $$props2)
          $$invalidate(6, $$scope = $$props2.$$scope);
      };
      return [
        id,
        hover,
        classes,
        fw,
        label,
        options,
        $$scope,
        slots,
        mouseover_handler,
        mouseout_handler,
        click_handler2
      ];
    }
    class Label extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$E, create_fragment$F, safe_not_equal, { id: 0, hover: 1, options: 5 });
      }
    }
    function get_each_context$9(ctx, list, i2) {
      const child_ctx = ctx.slice();
      child_ctx[5] = list[i2];
      child_ctx[7] = i2;
      return child_ctx;
    }
    function create_each_block$9(ctx) {
      let div;
      let input;
      let input_id_value;
      let input_checked_value;
      let t0;
      let label;
      let t1_value = (
        /*option*/
        ctx[5] + ""
      );
      let t1;
      let label_for_value;
      let t2;
      let div_class_value;
      let mounted;
      let dispose;
      function click_handler2() {
        return (
          /*click_handler*/
          ctx[4](
            /*option*/
            ctx[5]
          )
        );
      }
      return {
        c() {
          div = element("div");
          input = element("input");
          t0 = space();
          label = element("label");
          t1 = text(t1_value);
          t2 = space();
          attr(input, "class", "form-check-input");
          attr(input, "type", "radio");
          attr(
            input,
            "name",
            /*id*/
            ctx[1]
          );
          attr(input, "id", input_id_value = "" + /*id*/
          (ctx[1] + /*idx*/
          (ctx[7] + 1)));
          input.checked = input_checked_value = /*value*/
          ctx[0] ? (
            /*value*/
            ctx[0] === /*option*/
            ctx[5]
          ) : (
            /*idx*/
            ctx[7] === 0
          );
          attr(label, "class", "form-check-label");
          attr(label, "for", label_for_value = "" + /*id*/
          (ctx[1] + /*idx*/
          (ctx[7] + 1)));
          attr(div, "class", div_class_value = "form-check" + /*inline*/
          (ctx[3] ? "-inline" : ""));
        },
        m(target, anchor) {
          insert(target, div, anchor);
          append(div, input);
          append(div, t0);
          append(div, label);
          append(label, t1);
          append(div, t2);
          if (!mounted) {
            dispose = listen(input, "click", click_handler2);
            mounted = true;
          }
        },
        p(new_ctx, dirty) {
          ctx = new_ctx;
          if (dirty & /*id*/
          2) {
            attr(
              input,
              "name",
              /*id*/
              ctx[1]
            );
          }
          if (dirty & /*id*/
          2 && input_id_value !== (input_id_value = "" + /*id*/
          (ctx[1] + /*idx*/
          (ctx[7] + 1)))) {
            attr(input, "id", input_id_value);
          }
          if (dirty & /*value, options*/
          5 && input_checked_value !== (input_checked_value = /*value*/
          ctx[0] ? (
            /*value*/
            ctx[0] === /*option*/
            ctx[5]
          ) : (
            /*idx*/
            ctx[7] === 0
          ))) {
            input.checked = input_checked_value;
          }
          if (dirty & /*options*/
          4 && t1_value !== (t1_value = /*option*/
          ctx[5] + ""))
            set_data(t1, t1_value);
          if (dirty & /*id*/
          2 && label_for_value !== (label_for_value = "" + /*id*/
          (ctx[1] + /*idx*/
          (ctx[7] + 1)))) {
            attr(label, "for", label_for_value);
          }
          if (dirty & /*inline*/
          8 && div_class_value !== (div_class_value = "form-check" + /*inline*/
          (ctx[3] ? "-inline" : ""))) {
            attr(div, "class", div_class_value);
          }
        },
        d(detaching) {
          if (detaching)
            detach(div);
          mounted = false;
          dispose();
        }
      };
    }
    function create_fragment$E(ctx) {
      let each_1_anchor;
      let each_value = (
        /*options*/
        ctx[2]
      );
      let each_blocks = [];
      for (let i2 = 0; i2 < each_value.length; i2 += 1) {
        each_blocks[i2] = create_each_block$9(get_each_context$9(ctx, each_value, i2));
      }
      return {
        c() {
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            each_blocks[i2].c();
          }
          each_1_anchor = empty();
        },
        m(target, anchor) {
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            if (each_blocks[i2]) {
              each_blocks[i2].m(target, anchor);
            }
          }
          insert(target, each_1_anchor, anchor);
        },
        p(ctx2, [dirty]) {
          if (dirty & /*inline, id, options, value*/
          15) {
            each_value = /*options*/
            ctx2[2];
            let i2;
            for (i2 = 0; i2 < each_value.length; i2 += 1) {
              const child_ctx = get_each_context$9(ctx2, each_value, i2);
              if (each_blocks[i2]) {
                each_blocks[i2].p(child_ctx, dirty);
              } else {
                each_blocks[i2] = create_each_block$9(child_ctx);
                each_blocks[i2].c();
                each_blocks[i2].m(each_1_anchor.parentNode, each_1_anchor);
              }
            }
            for (; i2 < each_blocks.length; i2 += 1) {
              each_blocks[i2].d(1);
            }
            each_blocks.length = each_value.length;
          }
        },
        i: noop,
        o: noop,
        d(detaching) {
          destroy_each(each_blocks, detaching);
          if (detaching)
            detach(each_1_anchor);
        }
      };
    }
    function instance$D($$self, $$props, $$invalidate) {
      let { id = "" } = $$props;
      let { options = [] } = $$props;
      let { inline = false } = $$props;
      let { value = "" } = $$props;
      const click_handler2 = (option) => {
        $$invalidate(0, value = option);
      };
      $$self.$$set = ($$props2) => {
        if ("id" in $$props2)
          $$invalidate(1, id = $$props2.id);
        if ("options" in $$props2)
          $$invalidate(2, options = $$props2.options);
        if ("inline" in $$props2)
          $$invalidate(3, inline = $$props2.inline);
        if ("value" in $$props2)
          $$invalidate(0, value = $$props2.value);
      };
      return [value, id, options, inline, click_handler2];
    }
    class Radio extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$D, create_fragment$E, safe_not_equal, { id: 1, options: 2, inline: 3, value: 0 });
      }
    }
    function create_fragment$D(ctx) {
      let i2;
      let i_class_value;
      return {
        c() {
          i2 = element("i");
          attr(i2, "class", i_class_value = "status bi bi-circle-fill text-" + /*status*/
          ctx[0]);
        },
        m(target, anchor) {
          insert(target, i2, anchor);
        },
        p(ctx2, [dirty]) {
          if (dirty & /*status*/
          1 && i_class_value !== (i_class_value = "status bi bi-circle-fill text-" + /*status*/
          ctx2[0])) {
            attr(i2, "class", i_class_value);
          }
        },
        i: noop,
        o: noop,
        d(detaching) {
          if (detaching)
            detach(i2);
        }
      };
    }
    function instance$C($$self, $$props, $$invalidate) {
      let { status } = $$props;
      $$self.$$set = ($$props2) => {
        if ("status" in $$props2)
          $$invalidate(0, status = $$props2.status);
      };
      return [status];
    }
    class Status extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$C, create_fragment$D, safe_not_equal, { status: 0 });
      }
    }
    function create_else_block$7(ctx) {
      let svg;
      let path0;
      let path1;
      return {
        c() {
          svg = svg_element("svg");
          path0 = svg_element("path");
          path1 = svg_element("path");
          attr(path0, "fill-rule", "evenodd");
          attr(path0, "d", "M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z");
          attr(path1, "d", "M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z");
          attr(svg, "xmlns", "http://www.w3.org/2000/svg");
          attr(
            svg,
            "width",
            /*size*/
            ctx[1]
          );
          attr(
            svg,
            "height",
            /*size*/
            ctx[1]
          );
          attr(svg, "fill", "currentColor");
          attr(svg, "class", "bi bi-sort-alpha-down");
          attr(svg, "viewBox", "0 0 16 16");
        },
        m(target, anchor) {
          insert(target, svg, anchor);
          append(svg, path0);
          append(svg, path1);
        },
        p(ctx2, dirty) {
          if (dirty & /*size*/
          2) {
            attr(
              svg,
              "width",
              /*size*/
              ctx2[1]
            );
          }
          if (dirty & /*size*/
          2) {
            attr(
              svg,
              "height",
              /*size*/
              ctx2[1]
            );
          }
        },
        d(detaching) {
          if (detaching)
            detach(svg);
        }
      };
    }
    function create_if_block$c(ctx) {
      let svg;
      let path0;
      let path1;
      return {
        c() {
          svg = svg_element("svg");
          path0 = svg_element("path");
          path1 = svg_element("path");
          attr(path0, "fill-rule", "evenodd");
          attr(path0, "d", "M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z");
          attr(path1, "d", "M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zm-8.46-.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z");
          attr(svg, "xmlns", "http://www.w3.org/2000/svg");
          attr(
            svg,
            "width",
            /*size*/
            ctx[1]
          );
          attr(
            svg,
            "height",
            /*size*/
            ctx[1]
          );
          attr(svg, "fill", "currentColor");
          attr(svg, "class", "bi bi-sort-alpha-up");
          attr(svg, "viewBox", "0 0 l6 16");
        },
        m(target, anchor) {
          insert(target, svg, anchor);
          append(svg, path0);
          append(svg, path1);
        },
        p(ctx2, dirty) {
          if (dirty & /*size*/
          2) {
            attr(
              svg,
              "width",
              /*size*/
              ctx2[1]
            );
          }
          if (dirty & /*size*/
          2) {
            attr(
              svg,
              "height",
              /*size*/
              ctx2[1]
            );
          }
        },
        d(detaching) {
          if (detaching)
            detach(svg);
        }
      };
    }
    function create_fragment$C(ctx) {
      let if_block_anchor;
      function select_block_type(ctx2, dirty) {
        if (
          /*direction*/
          ctx2[0] == "desc"
        )
          return create_if_block$c;
        return create_else_block$7;
      }
      let current_block_type = select_block_type(ctx);
      let if_block = current_block_type(ctx);
      return {
        c() {
          if_block.c();
          if_block_anchor = empty();
        },
        m(target, anchor) {
          if_block.m(target, anchor);
          insert(target, if_block_anchor, anchor);
        },
        p(ctx2, [dirty]) {
          if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block) {
            if_block.p(ctx2, dirty);
          } else {
            if_block.d(1);
            if_block = current_block_type(ctx2);
            if (if_block) {
              if_block.c();
              if_block.m(if_block_anchor.parentNode, if_block_anchor);
            }
          }
        },
        i: noop,
        o: noop,
        d(detaching) {
          if_block.d(detaching);
          if (detaching)
            detach(if_block_anchor);
        }
      };
    }
    function instance$B($$self, $$props, $$invalidate) {
      let { key = "" } = $$props;
      let { selectedKey = "" } = $$props;
      let { direction = "asc" } = $$props;
      let size = 13;
      $$self.$$set = ($$props2) => {
        if ("key" in $$props2)
          $$invalidate(2, key = $$props2.key);
        if ("selectedKey" in $$props2)
          $$invalidate(3, selectedKey = $$props2.selectedKey);
        if ("direction" in $$props2)
          $$invalidate(0, direction = $$props2.direction);
      };
      $$self.$$.update = () => {
        if ($$self.$$.dirty & /*selectedKey, key*/
        12) {
          {
            if (selectedKey == key) {
              $$invalidate(1, size = 16);
            } else {
              $$invalidate(1, size = 13);
            }
          }
        }
      };
      return [direction, size, key, selectedKey];
    }
    class SortIcon extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$B, create_fragment$C, safe_not_equal, { key: 2, selectedKey: 3, direction: 0 });
      }
    }
    function create_if_block$b(ctx) {
      let div;
      let sorticon;
      let current;
      sorticon = new SortIcon({
        props: {
          key: (
            /*key*/
            ctx[1]
          ),
          selectedKey: (
            /*selectedKey*/
            ctx[3]
          ),
          direction: (
            /*direction*/
            ctx[4]
          )
        }
      });
      return {
        c() {
          div = element("div");
          create_component(sorticon.$$.fragment);
          set_style(div, "float", "right");
        },
        m(target, anchor) {
          insert(target, div, anchor);
          mount_component(sorticon, div, null);
          current = true;
        },
        p(ctx2, dirty) {
          const sorticon_changes = {};
          if (dirty & /*key*/
          2)
            sorticon_changes.key = /*key*/
            ctx2[1];
          if (dirty & /*selectedKey*/
          8)
            sorticon_changes.selectedKey = /*selectedKey*/
            ctx2[3];
          if (dirty & /*direction*/
          16)
            sorticon_changes.direction = /*direction*/
            ctx2[4];
          sorticon.$set(sorticon_changes);
        },
        i(local) {
          if (current)
            return;
          transition_in(sorticon.$$.fragment, local);
          current = true;
        },
        o(local) {
          transition_out(sorticon.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(div);
          destroy_component(sorticon);
        }
      };
    }
    function create_fragment$B(ctx) {
      let th;
      let t0;
      let t1;
      let th_class_value;
      let current;
      let mounted;
      let dispose;
      let if_block = (
        /*sortable*/
        ctx[2] && create_if_block$b(ctx)
      );
      return {
        c() {
          th = element("th");
          t0 = text(
            /*name*/
            ctx[0]
          );
          t1 = space();
          if (if_block)
            if_block.c();
          attr(th, "class", th_class_value = /*sortable*/
          ctx[2] ? "clickable" : "");
          attr(th, "scope", "col");
        },
        m(target, anchor) {
          insert(target, th, anchor);
          append(th, t0);
          append(th, t1);
          if (if_block)
            if_block.m(th, null);
          current = true;
          if (!mounted) {
            dispose = listen(
              th,
              "click",
              /*click_handler*/
              ctx[7]
            );
            mounted = true;
          }
        },
        p(ctx2, [dirty]) {
          if (!current || dirty & /*name*/
          1)
            set_data(
              t0,
              /*name*/
              ctx2[0]
            );
          if (
            /*sortable*/
            ctx2[2]
          ) {
            if (if_block) {
              if_block.p(ctx2, dirty);
              if (dirty & /*sortable*/
              4) {
                transition_in(if_block, 1);
              }
            } else {
              if_block = create_if_block$b(ctx2);
              if_block.c();
              transition_in(if_block, 1);
              if_block.m(th, null);
            }
          } else if (if_block) {
            group_outros();
            transition_out(if_block, 1, 1, () => {
              if_block = null;
            });
            check_outros();
          }
          if (!current || dirty & /*sortable*/
          4 && th_class_value !== (th_class_value = /*sortable*/
          ctx2[2] ? "clickable" : "")) {
            attr(th, "class", th_class_value);
          }
        },
        i(local) {
          if (current)
            return;
          transition_in(if_block);
          current = true;
        },
        o(local) {
          transition_out(if_block);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(th);
          if (if_block)
            if_block.d();
          mounted = false;
          dispose();
        }
      };
    }
    function instance$A($$self, $$props, $$invalidate) {
      let { name } = $$props;
      let { key } = $$props;
      let { sortable = true } = $$props;
      let { selectedKey = "" } = $$props;
      let direction = "asc";
      let { changeDirection = () => {
      } } = $$props;
      function updateDirection() {
        if (direction === "asc") {
          $$invalidate(4, direction = "desc");
        } else {
          $$invalidate(4, direction = "asc");
        }
        changeDirection(key, direction, sortable);
      }
      const click_handler2 = () => {
        updateDirection();
      };
      $$self.$$set = ($$props2) => {
        if ("name" in $$props2)
          $$invalidate(0, name = $$props2.name);
        if ("key" in $$props2)
          $$invalidate(1, key = $$props2.key);
        if ("sortable" in $$props2)
          $$invalidate(2, sortable = $$props2.sortable);
        if ("selectedKey" in $$props2)
          $$invalidate(3, selectedKey = $$props2.selectedKey);
        if ("changeDirection" in $$props2)
          $$invalidate(6, changeDirection = $$props2.changeDirection);
      };
      return [
        name,
        key,
        sortable,
        selectedKey,
        direction,
        updateDirection,
        changeDirection,
        click_handler2
      ];
    }
    class SortableTh extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$A, create_fragment$B, safe_not_equal, {
          name: 0,
          key: 1,
          sortable: 2,
          selectedKey: 3,
          changeDirection: 6
        });
      }
    }
    const get_png_slot_changes = (dirty) => ({});
    const get_png_slot_context = (ctx) => ({});
    const get_icon_slot_changes = (dirty) => ({});
    const get_icon_slot_context = (ctx) => ({});
    function create_else_block$6(ctx) {
      let button;
      let current;
      button = new Button({
        props: {
          classes: (
            /*classes*/
            ctx[6]
          ),
          text: (
            /*text*/
            ctx[0]
          ),
          type: (
            /*type*/
            ctx[2]
          ),
          "data-bs-toggle": "modal",
          "data-bs-target": "#" + /*id*/
          ctx[1]
        }
      });
      return {
        c() {
          create_component(button.$$.fragment);
        },
        m(target, anchor) {
          mount_component(button, target, anchor);
          current = true;
        },
        p(ctx2, dirty) {
          const button_changes = {};
          if (dirty & /*classes*/
          64)
            button_changes.classes = /*classes*/
            ctx2[6];
          if (dirty & /*text*/
          1)
            button_changes.text = /*text*/
            ctx2[0];
          if (dirty & /*type*/
          4)
            button_changes.type = /*type*/
            ctx2[2];
          if (dirty & /*id*/
          2)
            button_changes["data-bs-target"] = "#" + /*id*/
            ctx2[1];
          button.$set(button_changes);
        },
        i(local) {
          if (current)
            return;
          transition_in(button.$$.fragment, local);
          current = true;
        },
        o(local) {
          transition_out(button.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          destroy_component(button, detaching);
        }
      };
    }
    function create_if_block_1$5(ctx) {
      let current;
      const icon_slot_template = (
        /*#slots*/
        ctx[11].icon
      );
      const icon_slot = create_slot(
        icon_slot_template,
        ctx,
        /*$$scope*/
        ctx[10],
        get_icon_slot_context
      );
      return {
        c() {
          if (icon_slot)
            icon_slot.c();
        },
        m(target, anchor) {
          if (icon_slot) {
            icon_slot.m(target, anchor);
          }
          current = true;
        },
        p(ctx2, dirty) {
          if (icon_slot) {
            if (icon_slot.p && (!current || dirty & /*$$scope*/
            1024)) {
              update_slot_base(
                icon_slot,
                icon_slot_template,
                ctx2,
                /*$$scope*/
                ctx2[10],
                !current ? get_all_dirty_from_scope(
                  /*$$scope*/
                  ctx2[10]
                ) : get_slot_changes(
                  icon_slot_template,
                  /*$$scope*/
                  ctx2[10],
                  dirty,
                  get_icon_slot_changes
                ),
                get_icon_slot_context
              );
            }
          }
        },
        i(local) {
          if (current)
            return;
          transition_in(icon_slot, local);
          current = true;
        },
        o(local) {
          transition_out(icon_slot, local);
          current = false;
        },
        d(detaching) {
          if (icon_slot)
            icon_slot.d(detaching);
        }
      };
    }
    function create_if_block$a(ctx) {
      let div;
      let t_value = (
        /*info*/
        ctx[3].body + ""
      );
      let t2;
      return {
        c() {
          div = element("div");
          t2 = text(t_value);
          attr(div, "class", "modal-body");
        },
        m(target, anchor) {
          insert(target, div, anchor);
          append(div, t2);
        },
        p(ctx2, dirty) {
          if (dirty & /*info*/
          8 && t_value !== (t_value = /*info*/
          ctx2[3].body + ""))
            set_data(t2, t_value);
        },
        d(detaching) {
          if (detaching)
            detach(div);
        }
      };
    }
    function create_fragment$A(ctx) {
      let current_block_type_index;
      let if_block0;
      let t0;
      let div4;
      let div3;
      let div2;
      let div0;
      let button0;
      let t2;
      let t3;
      let h1;
      let raw_value = (
        /*info*/
        ctx[3].title + ""
      );
      let h1_id_value;
      let t4;
      let t5;
      let div1;
      let button1;
      let t6;
      let button2;
      let div3_style_value;
      let div4_aria_labelledby_value;
      let current;
      const if_block_creators = [create_if_block_1$5, create_else_block$6];
      const if_blocks = [];
      function select_block_type(ctx2, dirty) {
        if (
          /*$$slots*/
          ctx2[9].icon
        )
          return 0;
        return 1;
      }
      current_block_type_index = select_block_type(ctx);
      if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
      const png_slot_template = (
        /*#slots*/
        ctx[11].png
      );
      const png_slot = create_slot(
        png_slot_template,
        ctx,
        /*$$scope*/
        ctx[10],
        get_png_slot_context
      );
      let if_block1 = (
        /*info*/
        ctx[3].body && create_if_block$a(ctx)
      );
      let button1_props = {
        text: "취소",
        fill: "true",
        type: "0",
        "data-bs-dismiss": "modal",
        width: "20"
      };
      button1 = new Button({ props: button1_props });
      ctx[12](button1);
      button2 = new Button({
        props: {
          text: (
            /*text*/
            ctx[0]
          ),
          fill: "true",
          type: (
            /*type*/
            ctx[2]
          ),
          "data-bs-dismiss": "modal",
          width: "20",
          disabled: (
            /*actionButtonDisabled*/
            ctx[5]
          )
        }
      });
      button2.$on(
        "click",
        /*click_handler*/
        ctx[13]
      );
      return {
        c() {
          if_block0.c();
          t0 = space();
          div4 = element("div");
          div3 = element("div");
          div2 = element("div");
          div0 = element("div");
          button0 = element("button");
          button0.textContent = "✖";
          t2 = space();
          if (png_slot)
            png_slot.c();
          t3 = space();
          h1 = element("h1");
          t4 = space();
          if (if_block1)
            if_block1.c();
          t5 = space();
          div1 = element("div");
          create_component(button1.$$.fragment);
          t6 = space();
          create_component(button2.$$.fragment);
          attr(button0, "type", "button");
          attr(button0, "class", "float-end");
          attr(button0, "data-bs-dismiss", "modal");
          attr(button0, "aria-label", "Close");
          attr(h1, "class", "modal-title fs-5");
          attr(h1, "id", h1_id_value = /*id*/
          ctx[1] + "Label");
          attr(div0, "class", "modal-header");
          attr(div1, "class", "modal-footer");
          attr(div2, "class", "modal-content");
          attr(div3, "class", "modal-dialog modal-dialog-centered");
          attr(div3, "style", div3_style_value = /*maxWidth*/
          ctx[4] ? `--bs-modal-width:${/*maxWidth*/
          ctx[4]}px` : "");
          attr(div4, "class", "modal modal-fullscreen-md-down fade text-center");
          attr(
            div4,
            "id",
            /*id*/
            ctx[1]
          );
          attr(div4, "tabindex", "-1");
          attr(div4, "aria-labelledby", div4_aria_labelledby_value = /*id*/
          ctx[1] + "Label");
          attr(div4, "aria-hidden", "true");
        },
        m(target, anchor) {
          if_blocks[current_block_type_index].m(target, anchor);
          insert(target, t0, anchor);
          insert(target, div4, anchor);
          append(div4, div3);
          append(div3, div2);
          append(div2, div0);
          append(div0, button0);
          append(div0, t2);
          if (png_slot) {
            png_slot.m(div0, null);
          }
          append(div0, t3);
          append(div0, h1);
          h1.innerHTML = raw_value;
          append(div2, t4);
          if (if_block1)
            if_block1.m(div2, null);
          append(div2, t5);
          append(div2, div1);
          mount_component(button1, div1, null);
          append(div1, t6);
          mount_component(button2, div1, null);
          ctx[14](div4);
          current = true;
        },
        p(ctx2, [dirty]) {
          let previous_block_index = current_block_type_index;
          current_block_type_index = select_block_type(ctx2);
          if (current_block_type_index === previous_block_index) {
            if_blocks[current_block_type_index].p(ctx2, dirty);
          } else {
            group_outros();
            transition_out(if_blocks[previous_block_index], 1, 1, () => {
              if_blocks[previous_block_index] = null;
            });
            check_outros();
            if_block0 = if_blocks[current_block_type_index];
            if (!if_block0) {
              if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
              if_block0.c();
            } else {
              if_block0.p(ctx2, dirty);
            }
            transition_in(if_block0, 1);
            if_block0.m(t0.parentNode, t0);
          }
          if (png_slot) {
            if (png_slot.p && (!current || dirty & /*$$scope*/
            1024)) {
              update_slot_base(
                png_slot,
                png_slot_template,
                ctx2,
                /*$$scope*/
                ctx2[10],
                !current ? get_all_dirty_from_scope(
                  /*$$scope*/
                  ctx2[10]
                ) : get_slot_changes(
                  png_slot_template,
                  /*$$scope*/
                  ctx2[10],
                  dirty,
                  get_png_slot_changes
                ),
                get_png_slot_context
              );
            }
          }
          if ((!current || dirty & /*info*/
          8) && raw_value !== (raw_value = /*info*/
          ctx2[3].title + ""))
            h1.innerHTML = raw_value;
          if (!current || dirty & /*id*/
          2 && h1_id_value !== (h1_id_value = /*id*/
          ctx2[1] + "Label")) {
            attr(h1, "id", h1_id_value);
          }
          if (
            /*info*/
            ctx2[3].body
          ) {
            if (if_block1) {
              if_block1.p(ctx2, dirty);
            } else {
              if_block1 = create_if_block$a(ctx2);
              if_block1.c();
              if_block1.m(div2, t5);
            }
          } else if (if_block1) {
            if_block1.d(1);
            if_block1 = null;
          }
          const button1_changes = {};
          button1.$set(button1_changes);
          const button2_changes = {};
          if (dirty & /*text*/
          1)
            button2_changes.text = /*text*/
            ctx2[0];
          if (dirty & /*type*/
          4)
            button2_changes.type = /*type*/
            ctx2[2];
          if (dirty & /*actionButtonDisabled*/
          32)
            button2_changes.disabled = /*actionButtonDisabled*/
            ctx2[5];
          button2.$set(button2_changes);
          if (!current || dirty & /*maxWidth*/
          16 && div3_style_value !== (div3_style_value = /*maxWidth*/
          ctx2[4] ? `--bs-modal-width:${/*maxWidth*/
          ctx2[4]}px` : "")) {
            attr(div3, "style", div3_style_value);
          }
          if (!current || dirty & /*id*/
          2) {
            attr(
              div4,
              "id",
              /*id*/
              ctx2[1]
            );
          }
          if (!current || dirty & /*id*/
          2 && div4_aria_labelledby_value !== (div4_aria_labelledby_value = /*id*/
          ctx2[1] + "Label")) {
            attr(div4, "aria-labelledby", div4_aria_labelledby_value);
          }
        },
        i(local) {
          if (current)
            return;
          transition_in(if_block0);
          transition_in(png_slot, local);
          transition_in(button1.$$.fragment, local);
          transition_in(button2.$$.fragment, local);
          current = true;
        },
        o(local) {
          transition_out(if_block0);
          transition_out(png_slot, local);
          transition_out(button1.$$.fragment, local);
          transition_out(button2.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          if_blocks[current_block_type_index].d(detaching);
          if (detaching)
            detach(t0);
          if (detaching)
            detach(div4);
          if (png_slot)
            png_slot.d(detaching);
          if (if_block1)
            if_block1.d();
          ctx[12](null);
          destroy_component(button1);
          destroy_component(button2);
          ctx[14](null);
        }
      };
    }
    function instance$z($$self, $$props, $$invalidate) {
      let { $$slots: slots = {}, $$scope } = $$props;
      const $$slots = compute_slots(slots);
      let { text: text2 = "" } = $$props;
      let { id = "" } = $$props;
      let { type = 3 } = $$props;
      let { info = {
        title: "",
        body: "",
        btn: { primary: "", secondary: "" }
      } } = $$props;
      let { maxWidth = "" } = $$props;
      let { actionButtonDisabled = false } = $$props;
      let { classes = "" } = $$props;
      let element2, element1;
      onDestroy(() => {
        document.querySelector("body").classList.contains("modal-open") && location.reload();
      });
      function button1_binding($$value) {
        binding_callbacks[$$value ? "unshift" : "push"](() => {
          element2 = $$value;
          $$invalidate(7, element2);
        });
      }
      function click_handler2(event) {
        bubble.call(this, $$self, event);
      }
      function div4_binding($$value) {
        binding_callbacks[$$value ? "unshift" : "push"](() => {
          element1 = $$value;
          $$invalidate(8, element1);
        });
      }
      $$self.$$set = ($$props2) => {
        if ("text" in $$props2)
          $$invalidate(0, text2 = $$props2.text);
        if ("id" in $$props2)
          $$invalidate(1, id = $$props2.id);
        if ("type" in $$props2)
          $$invalidate(2, type = $$props2.type);
        if ("info" in $$props2)
          $$invalidate(3, info = $$props2.info);
        if ("maxWidth" in $$props2)
          $$invalidate(4, maxWidth = $$props2.maxWidth);
        if ("actionButtonDisabled" in $$props2)
          $$invalidate(5, actionButtonDisabled = $$props2.actionButtonDisabled);
        if ("classes" in $$props2)
          $$invalidate(6, classes = $$props2.classes);
        if ("$$scope" in $$props2)
          $$invalidate(10, $$scope = $$props2.$$scope);
      };
      return [
        text2,
        id,
        type,
        info,
        maxWidth,
        actionButtonDisabled,
        classes,
        element2,
        element1,
        $$slots,
        $$scope,
        slots,
        button1_binding,
        click_handler2,
        div4_binding
      ];
    }
    class Modal extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$z, create_fragment$A, safe_not_equal, {
          text: 0,
          id: 1,
          type: 2,
          info: 3,
          maxWidth: 4,
          actionButtonDisabled: 5,
          classes: 6
        });
      }
    }
    function create_icon_slot(ctx) {
      let i2;
      let i_data_bs_target_value;
      return {
        c() {
          i2 = element("i");
          attr(i2, "slot", "icon");
          attr(i2, "class", "bi bi-trash3 text-danger");
          attr(i2, "data-bs-toggle", "modal");
          attr(i2, "data-bs-target", i_data_bs_target_value = "#deleteApiSpec" + /*name*/
          ctx[2]);
        },
        m(target, anchor) {
          insert(target, i2, anchor);
        },
        p(ctx2, dirty) {
          if (dirty & /*name*/
          4 && i_data_bs_target_value !== (i_data_bs_target_value = "#deleteApiSpec" + /*name*/
          ctx2[2])) {
            attr(i2, "data-bs-target", i_data_bs_target_value);
          }
        },
        d(detaching) {
          if (detaching)
            detach(i2);
        }
      };
    }
    function create_fragment$z(ctx) {
      let modal;
      let current;
      modal = new Modal({
        props: {
          id: "deleteApiSpec" + /*name*/
          ctx[2],
          text: "삭제",
          type: "2",
          info: {
            title: `<b>${/*name*/
            ctx[2]}</b> 삭제하시겠습니까?`
          },
          $$slots: { icon: [create_icon_slot] },
          $$scope: { ctx }
        }
      });
      modal.$on(
        "click",
        /*click_handler*/
        ctx[3]
      );
      return {
        c() {
          create_component(modal.$$.fragment);
        },
        m(target, anchor) {
          mount_component(modal, target, anchor);
          current = true;
        },
        p(ctx2, [dirty]) {
          const modal_changes = {};
          if (dirty & /*name*/
          4)
            modal_changes.id = "deleteApiSpec" + /*name*/
            ctx2[2];
          if (dirty & /*name*/
          4)
            modal_changes.info = {
              title: `<b>${/*name*/
              ctx2[2]}</b> 삭제하시겠습니까?`
            };
          if (dirty & /*$$scope, name*/
          20) {
            modal_changes.$$scope = { dirty, ctx: ctx2 };
          }
          modal.$set(modal_changes);
        },
        i(local) {
          if (current)
            return;
          transition_in(modal.$$.fragment, local);
          current = true;
        },
        o(local) {
          transition_out(modal.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          destroy_component(modal, detaching);
        }
      };
    }
    function instance$y($$self, $$props, $$invalidate) {
      let { item = {} } = $$props;
      let { deleteHandler = () => {
      } } = $$props;
      let { name = "" } = $$props;
      const click_handler2 = () => __async(this, null, function* () {
        yield deleteHandler(item);
        const target = document.querySelector(".content-container");
        new Alert({
          target: target.parentNode,
          anchor: target,
          props: { code: 200, text: `${name} 가 삭제` }
        });
      });
      $$self.$$set = ($$props2) => {
        if ("item" in $$props2)
          $$invalidate(0, item = $$props2.item);
        if ("deleteHandler" in $$props2)
          $$invalidate(1, deleteHandler = $$props2.deleteHandler);
        if ("name" in $$props2)
          $$invalidate(2, name = $$props2.name);
      };
      return [item, deleteHandler, name, click_handler2];
    }
    class DeleteModal extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$y, create_fragment$z, safe_not_equal, { item: 0, deleteHandler: 1, name: 2 });
      }
    }
    var r = { grad: 0.9, turn: 360, rad: 360 / (2 * Math.PI) }, t$1 = function(r2) {
      return "string" == typeof r2 ? r2.length > 0 : "number" == typeof r2;
    }, n = function(r2, t2, n2) {
      return void 0 === t2 && (t2 = 0), void 0 === n2 && (n2 = Math.pow(10, t2)), Math.round(n2 * r2) / n2 + 0;
    }, e = function(r2, t2, n2) {
      return void 0 === t2 && (t2 = 0), void 0 === n2 && (n2 = 1), r2 > n2 ? n2 : r2 > t2 ? r2 : t2;
    }, u = function(r2) {
      return (r2 = isFinite(r2) ? r2 % 360 : 0) > 0 ? r2 : r2 + 360;
    }, a = function(r2) {
      return { r: e(r2.r, 0, 255), g: e(r2.g, 0, 255), b: e(r2.b, 0, 255), a: e(r2.a) };
    }, o$1 = function(r2) {
      return { r: n(r2.r), g: n(r2.g), b: n(r2.b), a: n(r2.a, 3) };
    }, i = /^#([0-9a-f]{3,8})$/i, s = function(r2) {
      var t2 = r2.toString(16);
      return t2.length < 2 ? "0" + t2 : t2;
    }, h = function(r2) {
      var t2 = r2.r, n2 = r2.g, e2 = r2.b, u2 = r2.a, a2 = Math.max(t2, n2, e2), o2 = a2 - Math.min(t2, n2, e2), i2 = o2 ? a2 === t2 ? (n2 - e2) / o2 : a2 === n2 ? 2 + (e2 - t2) / o2 : 4 + (t2 - n2) / o2 : 0;
      return { h: 60 * (i2 < 0 ? i2 + 6 : i2), s: a2 ? o2 / a2 * 100 : 0, v: a2 / 255 * 100, a: u2 };
    }, b = function(r2) {
      var t2 = r2.h, n2 = r2.s, e2 = r2.v, u2 = r2.a;
      t2 = t2 / 360 * 6, n2 /= 100, e2 /= 100;
      var a2 = Math.floor(t2), o2 = e2 * (1 - n2), i2 = e2 * (1 - (t2 - a2) * n2), s2 = e2 * (1 - (1 - t2 + a2) * n2), h2 = a2 % 6;
      return { r: 255 * [e2, i2, o2, o2, s2, e2][h2], g: 255 * [s2, e2, e2, i2, o2, o2][h2], b: 255 * [o2, o2, s2, e2, e2, i2][h2], a: u2 };
    }, g$1 = function(r2) {
      return { h: u(r2.h), s: e(r2.s, 0, 100), l: e(r2.l, 0, 100), a: e(r2.a) };
    }, d = function(r2) {
      return { h: n(r2.h), s: n(r2.s), l: n(r2.l), a: n(r2.a, 3) };
    }, f = function(r2) {
      return b((n2 = (t2 = r2).s, { h: t2.h, s: (n2 *= ((e2 = t2.l) < 50 ? e2 : 100 - e2) / 100) > 0 ? 2 * n2 / (e2 + n2) * 100 : 0, v: e2 + n2, a: t2.a }));
      var t2, n2, e2;
    }, c = function(r2) {
      return { h: (t2 = h(r2)).h, s: (u2 = (200 - (n2 = t2.s)) * (e2 = t2.v) / 100) > 0 && u2 < 200 ? n2 * e2 / 100 / (u2 <= 100 ? u2 : 200 - u2) * 100 : 0, l: u2 / 2, a: t2.a };
      var t2, n2, e2, u2;
    }, l = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, p = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, v = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, m = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, y = { string: [[function(r2) {
      var t2 = i.exec(r2);
      return t2 ? (r2 = t2[1]).length <= 4 ? { r: parseInt(r2[0] + r2[0], 16), g: parseInt(r2[1] + r2[1], 16), b: parseInt(r2[2] + r2[2], 16), a: 4 === r2.length ? n(parseInt(r2[3] + r2[3], 16) / 255, 2) : 1 } : 6 === r2.length || 8 === r2.length ? { r: parseInt(r2.substr(0, 2), 16), g: parseInt(r2.substr(2, 2), 16), b: parseInt(r2.substr(4, 2), 16), a: 8 === r2.length ? n(parseInt(r2.substr(6, 2), 16) / 255, 2) : 1 } : null : null;
    }, "hex"], [function(r2) {
      var t2 = v.exec(r2) || m.exec(r2);
      return t2 ? t2[2] !== t2[4] || t2[4] !== t2[6] ? null : a({ r: Number(t2[1]) / (t2[2] ? 100 / 255 : 1), g: Number(t2[3]) / (t2[4] ? 100 / 255 : 1), b: Number(t2[5]) / (t2[6] ? 100 / 255 : 1), a: void 0 === t2[7] ? 1 : Number(t2[7]) / (t2[8] ? 100 : 1) }) : null;
    }, "rgb"], [function(t2) {
      var n2 = l.exec(t2) || p.exec(t2);
      if (!n2)
        return null;
      var e2, u2, a2 = g$1({ h: (e2 = n2[1], u2 = n2[2], void 0 === u2 && (u2 = "deg"), Number(e2) * (r[u2] || 1)), s: Number(n2[3]), l: Number(n2[4]), a: void 0 === n2[5] ? 1 : Number(n2[5]) / (n2[6] ? 100 : 1) });
      return f(a2);
    }, "hsl"]], object: [[function(r2) {
      var n2 = r2.r, e2 = r2.g, u2 = r2.b, o2 = r2.a, i2 = void 0 === o2 ? 1 : o2;
      return t$1(n2) && t$1(e2) && t$1(u2) ? a({ r: Number(n2), g: Number(e2), b: Number(u2), a: Number(i2) }) : null;
    }, "rgb"], [function(r2) {
      var n2 = r2.h, e2 = r2.s, u2 = r2.l, a2 = r2.a, o2 = void 0 === a2 ? 1 : a2;
      if (!t$1(n2) || !t$1(e2) || !t$1(u2))
        return null;
      var i2 = g$1({ h: Number(n2), s: Number(e2), l: Number(u2), a: Number(o2) });
      return f(i2);
    }, "hsl"], [function(r2) {
      var n2 = r2.h, a2 = r2.s, o2 = r2.v, i2 = r2.a, s2 = void 0 === i2 ? 1 : i2;
      if (!t$1(n2) || !t$1(a2) || !t$1(o2))
        return null;
      var h2 = function(r3) {
        return { h: u(r3.h), s: e(r3.s, 0, 100), v: e(r3.v, 0, 100), a: e(r3.a) };
      }({ h: Number(n2), s: Number(a2), v: Number(o2), a: Number(s2) });
      return b(h2);
    }, "hsv"]] }, N = function(r2, t2) {
      for (var n2 = 0; n2 < t2.length; n2++) {
        var e2 = t2[n2][0](r2);
        if (e2)
          return [e2, t2[n2][1]];
      }
      return [null, void 0];
    }, x = function(r2) {
      return "string" == typeof r2 ? N(r2.trim(), y.string) : "object" == typeof r2 && null !== r2 ? N(r2, y.object) : [null, void 0];
    }, M = function(r2, t2) {
      var n2 = c(r2);
      return { h: n2.h, s: e(n2.s + 100 * t2, 0, 100), l: n2.l, a: n2.a };
    }, H = function(r2) {
      return (299 * r2.r + 587 * r2.g + 114 * r2.b) / 1e3 / 255;
    }, $ = function(r2, t2) {
      var n2 = c(r2);
      return { h: n2.h, s: n2.s, l: e(n2.l + 100 * t2, 0, 100), a: n2.a };
    }, j = function() {
      function r2(r3) {
        this.parsed = x(r3)[0], this.rgba = this.parsed || { r: 0, g: 0, b: 0, a: 1 };
      }
      return r2.prototype.isValid = function() {
        return null !== this.parsed;
      }, r2.prototype.brightness = function() {
        return n(H(this.rgba), 2);
      }, r2.prototype.isDark = function() {
        return H(this.rgba) < 0.5;
      }, r2.prototype.isLight = function() {
        return H(this.rgba) >= 0.5;
      }, r2.prototype.toHex = function() {
        return r3 = o$1(this.rgba), t2 = r3.r, e2 = r3.g, u2 = r3.b, i2 = (a2 = r3.a) < 1 ? s(n(255 * a2)) : "", "#" + s(t2) + s(e2) + s(u2) + i2;
        var r3, t2, e2, u2, a2, i2;
      }, r2.prototype.toRgb = function() {
        return o$1(this.rgba);
      }, r2.prototype.toRgbString = function() {
        return r3 = o$1(this.rgba), t2 = r3.r, n2 = r3.g, e2 = r3.b, (u2 = r3.a) < 1 ? "rgba(" + t2 + ", " + n2 + ", " + e2 + ", " + u2 + ")" : "rgb(" + t2 + ", " + n2 + ", " + e2 + ")";
        var r3, t2, n2, e2, u2;
      }, r2.prototype.toHsl = function() {
        return d(c(this.rgba));
      }, r2.prototype.toHslString = function() {
        return r3 = d(c(this.rgba)), t2 = r3.h, n2 = r3.s, e2 = r3.l, (u2 = r3.a) < 1 ? "hsla(" + t2 + ", " + n2 + "%, " + e2 + "%, " + u2 + ")" : "hsl(" + t2 + ", " + n2 + "%, " + e2 + "%)";
        var r3, t2, n2, e2, u2;
      }, r2.prototype.toHsv = function() {
        return r3 = h(this.rgba), { h: n(r3.h), s: n(r3.s), v: n(r3.v), a: n(r3.a, 3) };
        var r3;
      }, r2.prototype.invert = function() {
        return w({ r: 255 - (r3 = this.rgba).r, g: 255 - r3.g, b: 255 - r3.b, a: r3.a });
        var r3;
      }, r2.prototype.saturate = function(r3) {
        return void 0 === r3 && (r3 = 0.1), w(M(this.rgba, r3));
      }, r2.prototype.desaturate = function(r3) {
        return void 0 === r3 && (r3 = 0.1), w(M(this.rgba, -r3));
      }, r2.prototype.grayscale = function() {
        return w(M(this.rgba, -1));
      }, r2.prototype.lighten = function(r3) {
        return void 0 === r3 && (r3 = 0.1), w($(this.rgba, r3));
      }, r2.prototype.darken = function(r3) {
        return void 0 === r3 && (r3 = 0.1), w($(this.rgba, -r3));
      }, r2.prototype.rotate = function(r3) {
        return void 0 === r3 && (r3 = 15), this.hue(this.hue() + r3);
      }, r2.prototype.alpha = function(r3) {
        return "number" == typeof r3 ? w({ r: (t2 = this.rgba).r, g: t2.g, b: t2.b, a: r3 }) : n(this.rgba.a, 3);
        var t2;
      }, r2.prototype.hue = function(r3) {
        var t2 = c(this.rgba);
        return "number" == typeof r3 ? w({ h: r3, s: t2.s, l: t2.l, a: t2.a }) : n(t2.h);
      }, r2.prototype.isEqual = function(r3) {
        return this.toHex() === w(r3).toHex();
      }, r2;
    }(), w = function(r2) {
      return r2 instanceof j ? r2 : new j(r2);
    }, S = [], k = function(r2) {
      r2.forEach(function(r3) {
        S.indexOf(r3) < 0 && (r3(j, y), S.push(r3));
      });
    };
    var o = function(o2) {
      var t2 = o2 / 255;
      return t2 < 0.04045 ? t2 / 12.92 : Math.pow((t2 + 0.055) / 1.055, 2.4);
    }, t = function(t2) {
      return 0.2126 * o(t2.r) + 0.7152 * o(t2.g) + 0.0722 * o(t2.b);
    };
    function a11yPlugin(o2) {
      o2.prototype.luminance = function() {
        return o3 = t(this.rgba), void 0 === (r2 = 2) && (r2 = 0), void 0 === n2 && (n2 = Math.pow(10, r2)), Math.round(n2 * o3) / n2 + 0;
        var o3, r2, n2;
      }, o2.prototype.contrast = function(r2) {
        void 0 === r2 && (r2 = "#FFF");
        var n2, a2, i2, e2, v2, u2, d2, c2 = r2 instanceof o2 ? r2 : new o2(r2);
        return e2 = this.rgba, v2 = c2.toRgb(), u2 = t(e2), d2 = t(v2), n2 = u2 > d2 ? (u2 + 0.05) / (d2 + 0.05) : (d2 + 0.05) / (u2 + 0.05), void 0 === (a2 = 2) && (a2 = 0), void 0 === i2 && (i2 = Math.pow(10, a2)), Math.floor(i2 * n2) / i2 + 0;
      }, o2.prototype.isReadable = function(o3, t2) {
        return void 0 === o3 && (o3 = "#FFF"), void 0 === t2 && (t2 = {}), this.contrast(o3) >= (e2 = void 0 === (i2 = (r2 = t2).size) ? "normal" : i2, "AAA" === (a2 = void 0 === (n2 = r2.level) ? "AA" : n2) && "normal" === e2 ? 7 : "AA" === a2 && "large" === e2 ? 3 : 4.5);
        var r2, n2, a2, i2, e2;
      };
    }
    const keyPressed = writable({
      ArrowLeft: 0,
      ArrowUp: 0,
      ArrowRight: 0,
      ArrowDown: 0
    });
    const keyPressedCustom = derived(keyPressed, ($keyPressed) => {
      return __spreadProps(__spreadValues({}, $keyPressed), {
        ArrowV: $keyPressed.ArrowUp + $keyPressed.ArrowDown,
        ArrowH: $keyPressed.ArrowLeft + $keyPressed.ArrowRight,
        ArrowVH: $keyPressed.ArrowUp + $keyPressed.ArrowDown + $keyPressed.ArrowLeft + $keyPressed.ArrowRight
      });
    });
    function easeInOutSin(x2, min = 1e-3, max = 0.01) {
      const DELAY = 50;
      const DURATION = 50;
      const X = Math.min(1, Math.max(1, x2 - DELAY) / DURATION);
      return min + (max - min) / 2 * (1 - Math.cos(Math.PI * X));
    }
    const Picker_svelte_svelte_type_style_lang = "";
    const { window: window_1$2 } = globals;
    function create_default_slot$4(ctx) {
      let div;
      let switch_instance;
      let div_aria_valuetext_value;
      let current;
      let mounted;
      let dispose;
      var switch_value = (
        /*components*/
        ctx[2].pickerIndicator
      );
      function switch_props(ctx2) {
        return {
          props: {
            pos: (
              /*pos*/
              ctx2[9]
            ),
            isDark: (
              /*isDark*/
              ctx2[5]
            ),
            hex: w({
              h: (
                /*h*/
                ctx2[3]
              ),
              s: (
                /*s*/
                ctx2[0]
              ),
              v: (
                /*v*/
                ctx2[1]
              ),
              a: 1
            }).toHex()
          }
        };
      }
      if (switch_value) {
        switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
      }
      return {
        c() {
          var _a, _b;
          div = element("div");
          if (switch_instance)
            create_component(switch_instance.$$.fragment);
          attr(div, "class", "picker svelte-uiwgvv");
          attr(div, "tabindex", "0");
          set_style(
            div,
            "--color-bg",
            /*colorBg*/
            ctx[8]
          );
          attr(div, "aria-label", "saturation and brightness picker (arrow keyboard navigation)");
          attr(div, "aria-valuemin", 0);
          attr(div, "aria-valuemax", 100);
          attr(div, "aria-valuetext", div_aria_valuetext_value = "saturation " + /*pos*/
          ((_a = ctx[9].x) == null ? void 0 : _a.toFixed()) + "%, brightness " + /*pos*/
          ((_b = ctx[9].y) == null ? void 0 : _b.toFixed()) + "%");
        },
        m(target, anchor) {
          insert(target, div, anchor);
          if (switch_instance)
            mount_component(switch_instance, div, null);
          ctx[18](div);
          current = true;
          if (!mounted) {
            dispose = [
              listen(div, "mousedown", prevent_default(
                /*pickerMousedown*/
                ctx[10]
              )),
              listen(
                div,
                "touchstart",
                /*touch*/
                ctx[16]
              ),
              listen(div, "touchmove", prevent_default(
                /*touch*/
                ctx[16]
              )),
              listen(
                div,
                "touchend",
                /*touch*/
                ctx[16]
              )
            ];
            mounted = true;
          }
        },
        p(ctx2, dirty) {
          var _a, _b;
          const switch_instance_changes = {};
          if (dirty & /*pos*/
          512)
            switch_instance_changes.pos = /*pos*/
            ctx2[9];
          if (dirty & /*isDark*/
          32)
            switch_instance_changes.isDark = /*isDark*/
            ctx2[5];
          if (dirty & /*h, s, v*/
          11)
            switch_instance_changes.hex = w({
              h: (
                /*h*/
                ctx2[3]
              ),
              s: (
                /*s*/
                ctx2[0]
              ),
              v: (
                /*v*/
                ctx2[1]
              ),
              a: 1
            }).toHex();
          if (dirty & /*components*/
          4 && switch_value !== (switch_value = /*components*/
          ctx2[2].pickerIndicator)) {
            if (switch_instance) {
              group_outros();
              const old_component = switch_instance;
              transition_out(old_component.$$.fragment, 1, 0, () => {
                destroy_component(old_component, 1);
              });
              check_outros();
            }
            if (switch_value) {
              switch_instance = construct_svelte_component(switch_value, switch_props(ctx2));
              create_component(switch_instance.$$.fragment);
              transition_in(switch_instance.$$.fragment, 1);
              mount_component(switch_instance, div, null);
            } else {
              switch_instance = null;
            }
          } else if (switch_value) {
            switch_instance.$set(switch_instance_changes);
          }
          if (!current || dirty & /*colorBg*/
          256) {
            set_style(
              div,
              "--color-bg",
              /*colorBg*/
              ctx2[8]
            );
          }
          if (!current || dirty & /*pos*/
          512 && div_aria_valuetext_value !== (div_aria_valuetext_value = "saturation " + /*pos*/
          ((_a = ctx2[9].x) == null ? void 0 : _a.toFixed()) + "%, brightness " + /*pos*/
          ((_b = ctx2[9].y) == null ? void 0 : _b.toFixed()) + "%")) {
            attr(div, "aria-valuetext", div_aria_valuetext_value);
          }
        },
        i(local) {
          if (current)
            return;
          if (switch_instance)
            transition_in(switch_instance.$$.fragment, local);
          current = true;
        },
        o(local) {
          if (switch_instance)
            transition_out(switch_instance.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(div);
          if (switch_instance)
            destroy_component(switch_instance);
          ctx[18](null);
          mounted = false;
          run_all(dispose);
        }
      };
    }
    function create_fragment$y(ctx) {
      let switch_instance;
      let switch_instance_anchor;
      let current;
      let mounted;
      let dispose;
      var switch_value = (
        /*components*/
        ctx[2].pickerWrapper
      );
      function switch_props(ctx2) {
        return {
          props: {
            focused: (
              /*focused*/
              ctx2[7]
            ),
            toRight: (
              /*toRight*/
              ctx2[4]
            ),
            $$slots: { default: [create_default_slot$4] },
            $$scope: { ctx: ctx2 }
          }
        };
      }
      if (switch_value) {
        switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
      }
      return {
        c() {
          if (switch_instance)
            create_component(switch_instance.$$.fragment);
          switch_instance_anchor = empty();
        },
        m(target, anchor) {
          if (switch_instance)
            mount_component(switch_instance, target, anchor);
          insert(target, switch_instance_anchor, anchor);
          current = true;
          if (!mounted) {
            dispose = [
              listen(
                window_1$2,
                "mouseup",
                /*mouseUp*/
                ctx[11]
              ),
              listen(
                window_1$2,
                "mousedown",
                /*mouseDown*/
                ctx[13]
              ),
              listen(
                window_1$2,
                "mousemove",
                /*mouseMove*/
                ctx[12]
              ),
              listen(
                window_1$2,
                "keyup",
                /*keyup*/
                ctx[14]
              ),
              listen(
                window_1$2,
                "keydown",
                /*keydown*/
                ctx[15]
              )
            ];
            mounted = true;
          }
        },
        p(ctx2, [dirty]) {
          const switch_instance_changes = {};
          if (dirty & /*focused*/
          128)
            switch_instance_changes.focused = /*focused*/
            ctx2[7];
          if (dirty & /*toRight*/
          16)
            switch_instance_changes.toRight = /*toRight*/
            ctx2[4];
          if (dirty & /*$$scope, colorBg, pos, picker, components, isDark, h, s, v*/
          67109743) {
            switch_instance_changes.$$scope = { dirty, ctx: ctx2 };
          }
          if (dirty & /*components*/
          4 && switch_value !== (switch_value = /*components*/
          ctx2[2].pickerWrapper)) {
            if (switch_instance) {
              group_outros();
              const old_component = switch_instance;
              transition_out(old_component.$$.fragment, 1, 0, () => {
                destroy_component(old_component, 1);
              });
              check_outros();
            }
            if (switch_value) {
              switch_instance = construct_svelte_component(switch_value, switch_props(ctx2));
              create_component(switch_instance.$$.fragment);
              transition_in(switch_instance.$$.fragment, 1);
              mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
            } else {
              switch_instance = null;
            }
          } else if (switch_value) {
            switch_instance.$set(switch_instance_changes);
          }
        },
        i(local) {
          if (current)
            return;
          if (switch_instance)
            transition_in(switch_instance.$$.fragment, local);
          current = true;
        },
        o(local) {
          if (switch_instance)
            transition_out(switch_instance.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(switch_instance_anchor);
          if (switch_instance)
            destroy_component(switch_instance, detaching);
          mounted = false;
          run_all(dispose);
        }
      };
    }
    function clamp(value, min, max) {
      return Math.min(Math.max(min, value), max);
    }
    function instance$x($$self, $$props, $$invalidate) {
      let $keyPressed;
      let $keyPressedCustom;
      component_subscribe($$self, keyPressed, ($$value) => $$invalidate(22, $keyPressed = $$value));
      component_subscribe($$self, keyPressedCustom, ($$value) => $$invalidate(23, $keyPressedCustom = $$value));
      let { components } = $$props;
      let { h: h2 } = $$props;
      let { s: s2 } = $$props;
      let { v: v2 } = $$props;
      let { isOpen } = $$props;
      let { toRight } = $$props;
      let { isDark } = $$props;
      let picker;
      let isMouseDown = false;
      let focused = false;
      let focusMovementIntervalId;
      let focusMovementCounter;
      let colorBg;
      let pos = { x: 100, y: 0 };
      function onClick(e2) {
        let mouse = { x: e2.offsetX, y: e2.offsetY };
        let width = picker.getBoundingClientRect().width;
        let height = picker.getBoundingClientRect().height;
        $$invalidate(0, s2 = clamp(mouse.x / width, 0, 1) * 100);
        $$invalidate(1, v2 = clamp((height - mouse.y) / height, 0, 1) * 100);
      }
      function pickerMousedown(e2) {
        if (e2.button === 0) {
          isMouseDown = true;
          onClick(e2);
        }
      }
      function mouseUp() {
        isMouseDown = false;
      }
      function mouseMove(e2) {
        if (isMouseDown)
          onClick({
            offsetX: Math.max(0, Math.min(picker.getBoundingClientRect().width, e2.clientX - picker.getBoundingClientRect().left)),
            offsetY: Math.max(0, Math.min(picker.getBoundingClientRect().height, e2.clientY - picker.getBoundingClientRect().top))
          });
      }
      function mouseDown(e2) {
        if (!e2.target.isSameNode(picker))
          $$invalidate(7, focused = false);
      }
      function keyup(e2) {
        var _a;
        if (e2.key === "Tab")
          $$invalidate(7, focused = !!((_a = document.activeElement) == null ? void 0 : _a.isSameNode(picker)));
        if (!e2.repeat && focused)
          move();
      }
      function keydown(e2) {
        if (focused && $keyPressedCustom.ArrowVH) {
          e2.preventDefault();
          if (!e2.repeat)
            move();
        }
      }
      function move() {
        if ($keyPressedCustom.ArrowVH) {
          if (!focusMovementIntervalId) {
            focusMovementCounter = 0;
            focusMovementIntervalId = window.setInterval(
              () => {
                let focusMovementFactor = easeInOutSin(++focusMovementCounter);
                $$invalidate(0, s2 = Math.min(100, Math.max(0, s2 + ($keyPressed.ArrowRight - $keyPressed.ArrowLeft) * focusMovementFactor * 100)));
                $$invalidate(1, v2 = Math.min(100, Math.max(0, v2 + ($keyPressed.ArrowUp - $keyPressed.ArrowDown) * focusMovementFactor * 100)));
              },
              10
            );
          }
        } else if (focusMovementIntervalId) {
          clearInterval(focusMovementIntervalId);
          focusMovementIntervalId = void 0;
        }
      }
      function touch(e2) {
        e2.preventDefault();
        onClick({
          offsetX: e2.changedTouches[0].clientX - picker.getBoundingClientRect().left,
          offsetY: e2.changedTouches[0].clientY - picker.getBoundingClientRect().top
        });
      }
      function div_binding($$value) {
        binding_callbacks[$$value ? "unshift" : "push"](() => {
          picker = $$value;
          $$invalidate(6, picker);
        });
      }
      $$self.$$set = ($$props2) => {
        if ("components" in $$props2)
          $$invalidate(2, components = $$props2.components);
        if ("h" in $$props2)
          $$invalidate(3, h2 = $$props2.h);
        if ("s" in $$props2)
          $$invalidate(0, s2 = $$props2.s);
        if ("v" in $$props2)
          $$invalidate(1, v2 = $$props2.v);
        if ("isOpen" in $$props2)
          $$invalidate(17, isOpen = $$props2.isOpen);
        if ("toRight" in $$props2)
          $$invalidate(4, toRight = $$props2.toRight);
        if ("isDark" in $$props2)
          $$invalidate(5, isDark = $$props2.isDark);
      };
      $$self.$$.update = () => {
        if ($$self.$$.dirty & /*h*/
        8) {
          if (typeof h2 === "number")
            $$invalidate(8, colorBg = w({ h: h2, s: 100, v: 100, a: 1 }).toHex());
        }
        if ($$self.$$.dirty & /*s, v, picker*/
        67) {
          if (typeof s2 === "number" && typeof v2 === "number" && picker)
            $$invalidate(9, pos = { x: s2, y: 100 - v2 });
        }
      };
      return [
        s2,
        v2,
        components,
        h2,
        toRight,
        isDark,
        picker,
        focused,
        colorBg,
        pos,
        pickerMousedown,
        mouseUp,
        mouseMove,
        mouseDown,
        keyup,
        keydown,
        touch,
        isOpen,
        div_binding
      ];
    }
    class Picker extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$x, create_fragment$y, safe_not_equal, {
          components: 2,
          h: 3,
          s: 0,
          v: 1,
          isOpen: 17,
          toRight: 4,
          isDark: 5
        });
      }
    }
    const Slider_svelte_svelte_type_style_lang = "";
    const { window: window_1$1 } = globals;
    function create_default_slot$3(ctx) {
      let div;
      let switch_instance;
      let div_aria_valuenow_value;
      let current;
      let mounted;
      let dispose;
      var switch_value = (
        /*components*/
        ctx[1].sliderIndicator
      );
      function switch_props(ctx2) {
        return {
          props: {
            pos: (
              /*pos*/
              ctx2[4]
            ),
            toRight: (
              /*toRight*/
              ctx2[2]
            )
          }
        };
      }
      if (switch_value) {
        switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
      }
      return {
        c() {
          div = element("div");
          if (switch_instance)
            create_component(switch_instance.$$.fragment);
          attr(div, "class", "slider svelte-14nweqy");
          attr(div, "tabindex", "0");
          attr(div, "aria-label", "hue picker (arrow keyboard navigation)");
          attr(div, "aria-valuemin", 0);
          attr(div, "aria-valuemax", 360);
          attr(div, "aria-valuenow", div_aria_valuenow_value = Math.round(
            /*h*/
            ctx[0]
          ));
          toggle_class(
            div,
            "to-right",
            /*toRight*/
            ctx[2]
          );
        },
        m(target, anchor) {
          insert(target, div, anchor);
          if (switch_instance)
            mount_component(switch_instance, div, null);
          ctx[12](div);
          current = true;
          if (!mounted) {
            dispose = [
              listen(div, "mousedown", prevent_default(
                /*mouseDown*/
                ctx[6]
              )),
              listen(
                div,
                "touchstart",
                /*touch*/
                ctx[11]
              ),
              listen(div, "touchmove", prevent_default(
                /*touch*/
                ctx[11]
              )),
              listen(
                div,
                "touchend",
                /*touch*/
                ctx[11]
              )
            ];
            mounted = true;
          }
        },
        p(ctx2, dirty) {
          const switch_instance_changes = {};
          if (dirty & /*pos*/
          16)
            switch_instance_changes.pos = /*pos*/
            ctx2[4];
          if (dirty & /*toRight*/
          4)
            switch_instance_changes.toRight = /*toRight*/
            ctx2[2];
          if (dirty & /*components*/
          2 && switch_value !== (switch_value = /*components*/
          ctx2[1].sliderIndicator)) {
            if (switch_instance) {
              group_outros();
              const old_component = switch_instance;
              transition_out(old_component.$$.fragment, 1, 0, () => {
                destroy_component(old_component, 1);
              });
              check_outros();
            }
            if (switch_value) {
              switch_instance = construct_svelte_component(switch_value, switch_props(ctx2));
              create_component(switch_instance.$$.fragment);
              transition_in(switch_instance.$$.fragment, 1);
              mount_component(switch_instance, div, null);
            } else {
              switch_instance = null;
            }
          } else if (switch_value) {
            switch_instance.$set(switch_instance_changes);
          }
          if (!current || dirty & /*h*/
          1 && div_aria_valuenow_value !== (div_aria_valuenow_value = Math.round(
            /*h*/
            ctx2[0]
          ))) {
            attr(div, "aria-valuenow", div_aria_valuenow_value);
          }
          if (!current || dirty & /*toRight*/
          4) {
            toggle_class(
              div,
              "to-right",
              /*toRight*/
              ctx2[2]
            );
          }
        },
        i(local) {
          if (current)
            return;
          if (switch_instance)
            transition_in(switch_instance.$$.fragment, local);
          current = true;
        },
        o(local) {
          if (switch_instance)
            transition_out(switch_instance.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(div);
          if (switch_instance)
            destroy_component(switch_instance);
          ctx[12](null);
          mounted = false;
          run_all(dispose);
        }
      };
    }
    function create_fragment$x(ctx) {
      let switch_instance;
      let switch_instance_anchor;
      let current;
      let mounted;
      let dispose;
      var switch_value = (
        /*components*/
        ctx[1].sliderWrapper
      );
      function switch_props(ctx2) {
        return {
          props: {
            focused: (
              /*focused*/
              ctx2[5]
            ),
            toRight: (
              /*toRight*/
              ctx2[2]
            ),
            $$slots: { default: [create_default_slot$3] },
            $$scope: { ctx: ctx2 }
          }
        };
      }
      if (switch_value) {
        switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
      }
      return {
        c() {
          if (switch_instance)
            create_component(switch_instance.$$.fragment);
          switch_instance_anchor = empty();
        },
        m(target, anchor) {
          if (switch_instance)
            mount_component(switch_instance, target, anchor);
          insert(target, switch_instance_anchor, anchor);
          current = true;
          if (!mounted) {
            dispose = [
              listen(
                window_1$1,
                "mouseup",
                /*mouseUp*/
                ctx[7]
              ),
              listen(
                window_1$1,
                "mousemove",
                /*mouseMove*/
                ctx[8]
              ),
              listen(
                window_1$1,
                "keyup",
                /*keyup*/
                ctx[9]
              ),
              listen(
                window_1$1,
                "keydown",
                /*keydown*/
                ctx[10]
              )
            ];
            mounted = true;
          }
        },
        p(ctx2, [dirty]) {
          const switch_instance_changes = {};
          if (dirty & /*focused*/
          32)
            switch_instance_changes.focused = /*focused*/
            ctx2[5];
          if (dirty & /*toRight*/
          4)
            switch_instance_changes.toRight = /*toRight*/
            ctx2[2];
          if (dirty & /*$$scope, h, slider, toRight, components, pos*/
          1048607) {
            switch_instance_changes.$$scope = { dirty, ctx: ctx2 };
          }
          if (dirty & /*components*/
          2 && switch_value !== (switch_value = /*components*/
          ctx2[1].sliderWrapper)) {
            if (switch_instance) {
              group_outros();
              const old_component = switch_instance;
              transition_out(old_component.$$.fragment, 1, 0, () => {
                destroy_component(old_component, 1);
              });
              check_outros();
            }
            if (switch_value) {
              switch_instance = construct_svelte_component(switch_value, switch_props(ctx2));
              create_component(switch_instance.$$.fragment);
              transition_in(switch_instance.$$.fragment, 1);
              mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
            } else {
              switch_instance = null;
            }
          } else if (switch_value) {
            switch_instance.$set(switch_instance_changes);
          }
        },
        i(local) {
          if (current)
            return;
          if (switch_instance)
            transition_in(switch_instance.$$.fragment, local);
          current = true;
        },
        o(local) {
          if (switch_instance)
            transition_out(switch_instance.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(switch_instance_anchor);
          if (switch_instance)
            destroy_component(switch_instance, detaching);
          mounted = false;
          run_all(dispose);
        }
      };
    }
    function instance$w($$self, $$props, $$invalidate) {
      let $keyPressed;
      let $keyPressedCustom;
      component_subscribe($$self, keyPressed, ($$value) => $$invalidate(16, $keyPressed = $$value));
      component_subscribe($$self, keyPressedCustom, ($$value) => $$invalidate(17, $keyPressedCustom = $$value));
      let { components } = $$props;
      let { toRight } = $$props;
      let slider;
      let isMouseDown = false;
      let { h: h2 } = $$props;
      let pos = 0;
      let focused = false;
      let focusMovementIntervalId;
      let focusMovementCounter;
      function onClick(pos2) {
        const size = toRight ? slider.getBoundingClientRect().width : slider.getBoundingClientRect().height;
        const boundedPos = Math.max(0, Math.min(size, pos2));
        $$invalidate(0, h2 = boundedPos / size * 360);
      }
      function mouseDown(e2) {
        if (e2.button === 0) {
          isMouseDown = true;
          onClick(toRight ? e2.offsetX : e2.offsetY);
        }
      }
      function mouseUp() {
        isMouseDown = false;
      }
      function mouseMove(e2) {
        if (isMouseDown)
          onClick(toRight ? e2.clientX - slider.getBoundingClientRect().left : e2.clientY - slider.getBoundingClientRect().top);
      }
      function keyup(e2) {
        var _a;
        if (e2.key === "Tab")
          $$invalidate(5, focused = !!((_a = document.activeElement) == null ? void 0 : _a.isSameNode(slider)));
        if (!e2.repeat && focused)
          move();
      }
      function keydown(e2) {
        if (focused && $keyPressedCustom.ArrowVH) {
          e2.preventDefault();
          if (!e2.repeat)
            move();
        }
      }
      function move() {
        if ($keyPressedCustom.ArrowVH) {
          if (!focusMovementIntervalId) {
            focusMovementCounter = 0;
            focusMovementIntervalId = window.setInterval(
              () => {
                const focusMovementFactor = easeInOutSin(++focusMovementCounter);
                const movement = toRight ? $keyPressed.ArrowRight - $keyPressed.ArrowLeft : $keyPressed.ArrowDown - $keyPressed.ArrowUp;
                $$invalidate(0, h2 = Math.min(360, Math.max(0, h2 + movement * 360 * focusMovementFactor)));
              },
              10
            );
          }
        } else if (focusMovementIntervalId) {
          clearInterval(focusMovementIntervalId);
          focusMovementIntervalId = void 0;
        }
      }
      function touch(e2) {
        e2.preventDefault();
        onClick(toRight ? e2.changedTouches[0].clientX - slider.getBoundingClientRect().left : e2.changedTouches[0].clientY - slider.getBoundingClientRect().top);
      }
      function div_binding($$value) {
        binding_callbacks[$$value ? "unshift" : "push"](() => {
          slider = $$value;
          $$invalidate(3, slider);
        });
      }
      $$self.$$set = ($$props2) => {
        if ("components" in $$props2)
          $$invalidate(1, components = $$props2.components);
        if ("toRight" in $$props2)
          $$invalidate(2, toRight = $$props2.toRight);
        if ("h" in $$props2)
          $$invalidate(0, h2 = $$props2.h);
      };
      $$self.$$.update = () => {
        if ($$self.$$.dirty & /*h, slider*/
        9) {
          if (typeof h2 === "number" && slider)
            $$invalidate(4, pos = 100 * h2 / 360);
        }
      };
      return [
        h2,
        components,
        toRight,
        slider,
        pos,
        focused,
        mouseDown,
        mouseUp,
        mouseMove,
        keyup,
        keydown,
        touch,
        div_binding
      ];
    }
    class Slider extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$w, create_fragment$x, safe_not_equal, { components: 1, toRight: 2, h: 0 });
      }
    }
    const Alpha_svelte_svelte_type_style_lang = "";
    const { window: window_1 } = globals;
    function create_default_slot$2(ctx) {
      let div;
      let switch_instance;
      let div_aria_valuenow_value;
      let div_aria_valuetext_value;
      let current;
      let mounted;
      let dispose;
      var switch_value = (
        /*components*/
        ctx[0].alphaIndicator
      );
      function switch_props(ctx2) {
        return {
          props: {
            pos: (
              /*pos*/
              ctx2[5]
            ),
            toRight: (
              /*toRight*/
              ctx2[2]
            )
          }
        };
      }
      if (switch_value) {
        switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
      }
      return {
        c() {
          var _a, _b;
          div = element("div");
          if (switch_instance)
            create_component(switch_instance.$$.fragment);
          attr(div, "class", "alpha svelte-f2vq53");
          attr(div, "tabindex", "0");
          set_style(
            div,
            "--alpha-color",
            /*hex*/
            (_a = ctx[1]) == null ? void 0 : _a.substring(0, 7)
          );
          attr(div, "aria-label", "transparency picker (arrow keyboard navigation)");
          attr(div, "aria-valuemin", 0);
          attr(div, "aria-valuemax", 100);
          attr(div, "aria-valuenow", div_aria_valuenow_value = Math.round(
            /*pos*/
            ctx[5]
          ));
          attr(div, "aria-valuetext", div_aria_valuetext_value = /*pos*/
          ((_b = ctx[5]) == null ? void 0 : _b.toFixed()) + "%");
          toggle_class(
            div,
            "to-right",
            /*toRight*/
            ctx[2]
          );
        },
        m(target, anchor) {
          insert(target, div, anchor);
          if (switch_instance)
            mount_component(switch_instance, div, null);
          ctx[14](div);
          current = true;
          if (!mounted) {
            dispose = [
              listen(div, "mousedown", prevent_default(
                /*mouseDown*/
                ctx[6]
              )),
              listen(
                div,
                "touchstart",
                /*touch*/
                ctx[11]
              ),
              listen(div, "touchmove", prevent_default(
                /*touch*/
                ctx[11]
              )),
              listen(
                div,
                "touchend",
                /*touch*/
                ctx[11]
              )
            ];
            mounted = true;
          }
        },
        p(ctx2, dirty) {
          var _a, _b;
          const switch_instance_changes = {};
          if (dirty & /*pos*/
          32)
            switch_instance_changes.pos = /*pos*/
            ctx2[5];
          if (dirty & /*toRight*/
          4)
            switch_instance_changes.toRight = /*toRight*/
            ctx2[2];
          if (dirty & /*components*/
          1 && switch_value !== (switch_value = /*components*/
          ctx2[0].alphaIndicator)) {
            if (switch_instance) {
              group_outros();
              const old_component = switch_instance;
              transition_out(old_component.$$.fragment, 1, 0, () => {
                destroy_component(old_component, 1);
              });
              check_outros();
            }
            if (switch_value) {
              switch_instance = construct_svelte_component(switch_value, switch_props(ctx2));
              create_component(switch_instance.$$.fragment);
              transition_in(switch_instance.$$.fragment, 1);
              mount_component(switch_instance, div, null);
            } else {
              switch_instance = null;
            }
          } else if (switch_value) {
            switch_instance.$set(switch_instance_changes);
          }
          if (!current || dirty & /*hex*/
          2) {
            set_style(
              div,
              "--alpha-color",
              /*hex*/
              (_a = ctx2[1]) == null ? void 0 : _a.substring(0, 7)
            );
          }
          if (!current || dirty & /*pos*/
          32 && div_aria_valuenow_value !== (div_aria_valuenow_value = Math.round(
            /*pos*/
            ctx2[5]
          ))) {
            attr(div, "aria-valuenow", div_aria_valuenow_value);
          }
          if (!current || dirty & /*pos*/
          32 && div_aria_valuetext_value !== (div_aria_valuetext_value = /*pos*/
          ((_b = ctx2[5]) == null ? void 0 : _b.toFixed()) + "%")) {
            attr(div, "aria-valuetext", div_aria_valuetext_value);
          }
          if (!current || dirty & /*toRight*/
          4) {
            toggle_class(
              div,
              "to-right",
              /*toRight*/
              ctx2[2]
            );
          }
        },
        i(local) {
          if (current)
            return;
          if (switch_instance)
            transition_in(switch_instance.$$.fragment, local);
          current = true;
        },
        o(local) {
          if (switch_instance)
            transition_out(switch_instance.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(div);
          if (switch_instance)
            destroy_component(switch_instance);
          ctx[14](null);
          mounted = false;
          run_all(dispose);
        }
      };
    }
    function create_fragment$w(ctx) {
      let switch_instance;
      let switch_instance_anchor;
      let current;
      let mounted;
      let dispose;
      var switch_value = (
        /*components*/
        ctx[0].alphaWrapper
      );
      function switch_props(ctx2) {
        return {
          props: {
            focused: (
              /*focused*/
              ctx2[4]
            ),
            toRight: (
              /*toRight*/
              ctx2[2]
            ),
            $$slots: { default: [create_default_slot$2] },
            $$scope: { ctx: ctx2 }
          }
        };
      }
      if (switch_value) {
        switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
      }
      return {
        c() {
          if (switch_instance)
            create_component(switch_instance.$$.fragment);
          switch_instance_anchor = empty();
        },
        m(target, anchor) {
          if (switch_instance)
            mount_component(switch_instance, target, anchor);
          insert(target, switch_instance_anchor, anchor);
          current = true;
          if (!mounted) {
            dispose = [
              listen(
                window_1,
                "mouseup",
                /*mouseUp*/
                ctx[7]
              ),
              listen(
                window_1,
                "mousemove",
                /*mouseMove*/
                ctx[8]
              ),
              listen(
                window_1,
                "keyup",
                /*keyup*/
                ctx[9]
              ),
              listen(
                window_1,
                "keydown",
                /*keydown*/
                ctx[10]
              )
            ];
            mounted = true;
          }
        },
        p(ctx2, [dirty]) {
          const switch_instance_changes = {};
          if (dirty & /*focused*/
          16)
            switch_instance_changes.focused = /*focused*/
            ctx2[4];
          if (dirty & /*toRight*/
          4)
            switch_instance_changes.toRight = /*toRight*/
            ctx2[2];
          if (dirty & /*$$scope, hex, pos, alpha, toRight, components*/
          4194351) {
            switch_instance_changes.$$scope = { dirty, ctx: ctx2 };
          }
          if (dirty & /*components*/
          1 && switch_value !== (switch_value = /*components*/
          ctx2[0].alphaWrapper)) {
            if (switch_instance) {
              group_outros();
              const old_component = switch_instance;
              transition_out(old_component.$$.fragment, 1, 0, () => {
                destroy_component(old_component, 1);
              });
              check_outros();
            }
            if (switch_value) {
              switch_instance = construct_svelte_component(switch_value, switch_props(ctx2));
              create_component(switch_instance.$$.fragment);
              transition_in(switch_instance.$$.fragment, 1);
              mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
            } else {
              switch_instance = null;
            }
          } else if (switch_value) {
            switch_instance.$set(switch_instance_changes);
          }
        },
        i(local) {
          if (current)
            return;
          if (switch_instance)
            transition_in(switch_instance.$$.fragment, local);
          current = true;
        },
        o(local) {
          if (switch_instance)
            transition_out(switch_instance.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(switch_instance_anchor);
          if (switch_instance)
            destroy_component(switch_instance, detaching);
          mounted = false;
          run_all(dispose);
        }
      };
    }
    function instance$v($$self, $$props, $$invalidate) {
      let $keyPressed;
      let $keyPressedCustom;
      component_subscribe($$self, keyPressed, ($$value) => $$invalidate(18, $keyPressed = $$value));
      component_subscribe($$self, keyPressedCustom, ($$value) => $$invalidate(19, $keyPressedCustom = $$value));
      let { components } = $$props;
      let { isOpen } = $$props;
      let { a: a2 = 1 } = $$props;
      let { hex } = $$props;
      let { toRight } = $$props;
      let alpha;
      let isMouseDown = false;
      let focused = false;
      let focusMovementIntervalId;
      let focusMovementCounter;
      let pos;
      function onClick(pos2) {
        const size = toRight ? alpha.getBoundingClientRect().width : alpha.getBoundingClientRect().height;
        const boundedPos = Math.max(0, Math.min(size, pos2));
        $$invalidate(12, a2 = boundedPos / size);
      }
      function mouseDown(e2) {
        if (e2.button === 0) {
          isMouseDown = true;
          onClick(toRight ? e2.offsetX : e2.offsetY);
        }
      }
      function mouseUp() {
        isMouseDown = false;
      }
      function mouseMove(e2) {
        if (isMouseDown)
          onClick(toRight ? e2.clientX - alpha.getBoundingClientRect().left : e2.clientY - alpha.getBoundingClientRect().top);
      }
      function keyup(e2) {
        var _a;
        if (e2.key === "Tab")
          $$invalidate(4, focused = !!((_a = document.activeElement) == null ? void 0 : _a.isSameNode(alpha)));
        if (!e2.repeat && focused)
          move();
      }
      function keydown(e2) {
        if (focused && $keyPressedCustom.ArrowVH) {
          e2.preventDefault();
          if (!e2.repeat)
            move();
        }
      }
      function move() {
        if ($keyPressedCustom.ArrowVH) {
          if (!focusMovementIntervalId) {
            focusMovementCounter = 0;
            focusMovementIntervalId = window.setInterval(
              () => {
                const focusMovementFactor = easeInOutSin(++focusMovementCounter);
                const movement = toRight ? $keyPressed.ArrowRight - $keyPressed.ArrowLeft : $keyPressed.ArrowDown - $keyPressed.ArrowUp;
                $$invalidate(12, a2 = Math.min(1, Math.max(0, a2 + movement * focusMovementFactor)));
              },
              10
            );
          }
        } else if (focusMovementIntervalId) {
          clearInterval(focusMovementIntervalId);
          focusMovementIntervalId = void 0;
        }
      }
      function touch(e2) {
        e2.preventDefault();
        onClick(toRight ? e2.changedTouches[0].clientX - alpha.getBoundingClientRect().left : e2.changedTouches[0].clientY - alpha.getBoundingClientRect().top);
      }
      function div_binding($$value) {
        binding_callbacks[$$value ? "unshift" : "push"](() => {
          alpha = $$value;
          $$invalidate(3, alpha);
        });
      }
      $$self.$$set = ($$props2) => {
        if ("components" in $$props2)
          $$invalidate(0, components = $$props2.components);
        if ("isOpen" in $$props2)
          $$invalidate(13, isOpen = $$props2.isOpen);
        if ("a" in $$props2)
          $$invalidate(12, a2 = $$props2.a);
        if ("hex" in $$props2)
          $$invalidate(1, hex = $$props2.hex);
        if ("toRight" in $$props2)
          $$invalidate(2, toRight = $$props2.toRight);
      };
      $$self.$$.update = () => {
        if ($$self.$$.dirty & /*a, alpha*/
        4104) {
          if (typeof a2 === "number" && alpha)
            $$invalidate(5, pos = 100 * a2);
        }
      };
      return [
        components,
        hex,
        toRight,
        alpha,
        focused,
        pos,
        mouseDown,
        mouseUp,
        mouseMove,
        keyup,
        keydown,
        touch,
        a2,
        isOpen,
        div_binding
      ];
    }
    class Alpha extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$v, create_fragment$w, safe_not_equal, {
          components: 0,
          isOpen: 13,
          a: 12,
          hex: 1,
          toRight: 2
        });
      }
    }
    const TextInput_svelte_svelte_type_style_lang = "";
    function create_else_block$5(ctx) {
      let div;
      let input0;
      let t0;
      let input1;
      let t1;
      let input2;
      let t2;
      let mounted;
      let dispose;
      let if_block = (
        /*isAlpha*/
        ctx[2] && create_if_block_5$3(ctx)
      );
      return {
        c() {
          div = element("div");
          input0 = element("input");
          t0 = space();
          input1 = element("input");
          t1 = space();
          input2 = element("input");
          t2 = space();
          if (if_block)
            if_block.c();
          attr(input0, "aria-label", "hue chanel color");
          input0.value = /*h*/
          ctx[8];
          attr(input0, "type", "number");
          attr(input0, "min", "0");
          attr(input0, "max", "360");
          attr(input0, "class", "svelte-11z4jba");
          attr(input1, "aria-label", "saturation chanel color");
          input1.value = /*s*/
          ctx[7];
          attr(input1, "type", "number");
          attr(input1, "min", "0");
          attr(input1, "max", "100");
          attr(input1, "class", "svelte-11z4jba");
          attr(input2, "aria-label", "brightness chanel color");
          input2.value = /*v*/
          ctx[6];
          attr(input2, "type", "number");
          attr(input2, "min", "0");
          attr(input2, "max", "100");
          attr(input2, "class", "svelte-11z4jba");
          attr(div, "class", "input-container svelte-11z4jba");
        },
        m(target, anchor) {
          insert(target, div, anchor);
          append(div, input0);
          append(div, t0);
          append(div, input1);
          append(div, t1);
          append(div, input2);
          append(div, t2);
          if (if_block)
            if_block.m(div, null);
          if (!mounted) {
            dispose = [
              listen(
                input0,
                "input",
                /*updateHsv*/
                ctx[12]("h")
              ),
              listen(
                input1,
                "input",
                /*updateHsv*/
                ctx[12]("s")
              ),
              listen(
                input2,
                "input",
                /*updateHsv*/
                ctx[12]("v")
              )
            ];
            mounted = true;
          }
        },
        p(ctx2, dirty) {
          if (dirty & /*h*/
          256 && input0.value !== /*h*/
          ctx2[8]) {
            input0.value = /*h*/
            ctx2[8];
          }
          if (dirty & /*s*/
          128 && input1.value !== /*s*/
          ctx2[7]) {
            input1.value = /*s*/
            ctx2[7];
          }
          if (dirty & /*v*/
          64 && input2.value !== /*v*/
          ctx2[6]) {
            input2.value = /*v*/
            ctx2[6];
          }
          if (
            /*isAlpha*/
            ctx2[2]
          ) {
            if (if_block) {
              if_block.p(ctx2, dirty);
            } else {
              if_block = create_if_block_5$3(ctx2);
              if_block.c();
              if_block.m(div, null);
            }
          } else if (if_block) {
            if_block.d(1);
            if_block = null;
          }
        },
        d(detaching) {
          if (detaching)
            detach(div);
          if (if_block)
            if_block.d();
          mounted = false;
          run_all(dispose);
        }
      };
    }
    function create_if_block_3$4(ctx) {
      let div;
      let input0;
      let input0_value_value;
      let t0;
      let input1;
      let input1_value_value;
      let t1;
      let input2;
      let input2_value_value;
      let t2;
      let mounted;
      let dispose;
      let if_block = (
        /*isAlpha*/
        ctx[2] && create_if_block_4$3(ctx)
      );
      return {
        c() {
          div = element("div");
          input0 = element("input");
          t0 = space();
          input1 = element("input");
          t1 = space();
          input2 = element("input");
          t2 = space();
          if (if_block)
            if_block.c();
          attr(input0, "aria-label", "red chanel color");
          input0.value = input0_value_value = /*rgb*/
          ctx[0].r;
          attr(input0, "type", "number");
          attr(input0, "min", "0");
          attr(input0, "max", "255");
          attr(input0, "class", "svelte-11z4jba");
          attr(input1, "aria-label", "green chanel color");
          input1.value = input1_value_value = /*rgb*/
          ctx[0].g;
          attr(input1, "type", "number");
          attr(input1, "min", "0");
          attr(input1, "max", "255");
          attr(input1, "class", "svelte-11z4jba");
          attr(input2, "aria-label", "blue chanel color");
          input2.value = input2_value_value = /*rgb*/
          ctx[0].b;
          attr(input2, "type", "number");
          attr(input2, "min", "0");
          attr(input2, "max", "255");
          attr(input2, "class", "svelte-11z4jba");
          attr(div, "class", "input-container svelte-11z4jba");
        },
        m(target, anchor) {
          insert(target, div, anchor);
          append(div, input0);
          append(div, t0);
          append(div, input1);
          append(div, t1);
          append(div, input2);
          append(div, t2);
          if (if_block)
            if_block.m(div, null);
          if (!mounted) {
            dispose = [
              listen(
                input0,
                "input",
                /*updateRgb*/
                ctx[11]("r")
              ),
              listen(
                input1,
                "input",
                /*updateRgb*/
                ctx[11]("g")
              ),
              listen(
                input2,
                "input",
                /*updateRgb*/
                ctx[11]("b")
              )
            ];
            mounted = true;
          }
        },
        p(ctx2, dirty) {
          if (dirty & /*rgb*/
          1 && input0_value_value !== (input0_value_value = /*rgb*/
          ctx2[0].r) && input0.value !== input0_value_value) {
            input0.value = input0_value_value;
          }
          if (dirty & /*rgb*/
          1 && input1_value_value !== (input1_value_value = /*rgb*/
          ctx2[0].g) && input1.value !== input1_value_value) {
            input1.value = input1_value_value;
          }
          if (dirty & /*rgb*/
          1 && input2_value_value !== (input2_value_value = /*rgb*/
          ctx2[0].b) && input2.value !== input2_value_value) {
            input2.value = input2_value_value;
          }
          if (
            /*isAlpha*/
            ctx2[2]
          ) {
            if (if_block) {
              if_block.p(ctx2, dirty);
            } else {
              if_block = create_if_block_4$3(ctx2);
              if_block.c();
              if_block.m(div, null);
            }
          } else if (if_block) {
            if_block.d(1);
            if_block = null;
          }
        },
        d(detaching) {
          if (detaching)
            detach(div);
          if (if_block)
            if_block.d();
          mounted = false;
          run_all(dispose);
        }
      };
    }
    function create_if_block_1$4(ctx) {
      let div;
      let input;
      let t2;
      let mounted;
      let dispose;
      let if_block = (
        /*isAlpha*/
        ctx[2] && create_if_block_2$4(ctx)
      );
      return {
        c() {
          div = element("div");
          input = element("input");
          t2 = space();
          if (if_block)
            if_block.c();
          input.value = /*hex*/
          ctx[1];
          set_style(input, "flex", "3");
          attr(input, "class", "svelte-11z4jba");
          attr(div, "class", "input-container svelte-11z4jba");
        },
        m(target, anchor) {
          insert(target, div, anchor);
          append(div, input);
          append(div, t2);
          if (if_block)
            if_block.m(div, null);
          if (!mounted) {
            dispose = listen(
              input,
              "input",
              /*updateHex*/
              ctx[10]
            );
            mounted = true;
          }
        },
        p(ctx2, dirty) {
          if (dirty & /*hex*/
          2 && input.value !== /*hex*/
          ctx2[1]) {
            input.value = /*hex*/
            ctx2[1];
          }
          if (
            /*isAlpha*/
            ctx2[2]
          ) {
            if (if_block) {
              if_block.p(ctx2, dirty);
            } else {
              if_block = create_if_block_2$4(ctx2);
              if_block.c();
              if_block.m(div, null);
            }
          } else if (if_block) {
            if_block.d(1);
            if_block = null;
          }
        },
        d(detaching) {
          if (detaching)
            detach(div);
          if (if_block)
            if_block.d();
          mounted = false;
          dispose();
        }
      };
    }
    function create_if_block_5$3(ctx) {
      let input;
      let mounted;
      let dispose;
      return {
        c() {
          input = element("input");
          attr(input, "aria-label", "transparency chanel color");
          input.value = /*a*/
          ctx[5];
          attr(input, "type", "number");
          attr(input, "min", "0");
          attr(input, "max", "1");
          attr(input, "step", "0.01");
          attr(input, "class", "svelte-11z4jba");
        },
        m(target, anchor) {
          insert(target, input, anchor);
          if (!mounted) {
            dispose = listen(
              input,
              "input",
              /*updateHsv*/
              ctx[12]("a")
            );
            mounted = true;
          }
        },
        p(ctx2, dirty) {
          if (dirty & /*a*/
          32 && input.value !== /*a*/
          ctx2[5]) {
            input.value = /*a*/
            ctx2[5];
          }
        },
        d(detaching) {
          if (detaching)
            detach(input);
          mounted = false;
          dispose();
        }
      };
    }
    function create_if_block_4$3(ctx) {
      let input;
      let mounted;
      let dispose;
      return {
        c() {
          input = element("input");
          attr(input, "aria-label", "transparency chanel color");
          input.value = /*a*/
          ctx[5];
          attr(input, "type", "number");
          attr(input, "min", "0");
          attr(input, "max", "1");
          attr(input, "step", "0.01");
          attr(input, "class", "svelte-11z4jba");
        },
        m(target, anchor) {
          insert(target, input, anchor);
          if (!mounted) {
            dispose = listen(
              input,
              "input",
              /*updateRgb*/
              ctx[11]("a")
            );
            mounted = true;
          }
        },
        p(ctx2, dirty) {
          if (dirty & /*a*/
          32 && input.value !== /*a*/
          ctx2[5]) {
            input.value = /*a*/
            ctx2[5];
          }
        },
        d(detaching) {
          if (detaching)
            detach(input);
          mounted = false;
          dispose();
        }
      };
    }
    function create_if_block_2$4(ctx) {
      let input;
      let mounted;
      let dispose;
      return {
        c() {
          input = element("input");
          attr(input, "aria-label", "hexadecimal color");
          input.value = /*a*/
          ctx[5];
          attr(input, "type", "number");
          attr(input, "min", "0");
          attr(input, "max", "1");
          attr(input, "step", "0.01");
          attr(input, "class", "svelte-11z4jba");
        },
        m(target, anchor) {
          insert(target, input, anchor);
          if (!mounted) {
            dispose = listen(
              input,
              "input",
              /*updateRgb*/
              ctx[11]("a")
            );
            mounted = true;
          }
        },
        p(ctx2, dirty) {
          if (dirty & /*a*/
          32 && input.value !== /*a*/
          ctx2[5]) {
            input.value = /*a*/
            ctx2[5];
          }
        },
        d(detaching) {
          if (detaching)
            detach(input);
          mounted = false;
          dispose();
        }
      };
    }
    function create_if_block$9(ctx) {
      let button;
      let t_value = (
        /*modes*/
        ctx[9][
          /*mode*/
          ctx[4]
        ] + ""
      );
      let t2;
      let button_aria_label_value;
      let mounted;
      let dispose;
      return {
        c() {
          button = element("button");
          t2 = text(t_value);
          attr(button, "aria-label", button_aria_label_value = "change inputs to " + /*modes*/
          ctx[9][
            /*mode*/
            (ctx[4] + 1) % 3
          ]);
          attr(button, "class", "svelte-11z4jba");
        },
        m(target, anchor) {
          insert(target, button, anchor);
          append(button, t2);
          if (!mounted) {
            dispose = listen(
              button,
              "click",
              /*click_handler*/
              ctx[14]
            );
            mounted = true;
          }
        },
        p(ctx2, dirty) {
          if (dirty & /*mode*/
          16 && t_value !== (t_value = /*modes*/
          ctx2[9][
            /*mode*/
            ctx2[4]
          ] + ""))
            set_data(t2, t_value);
          if (dirty & /*mode*/
          16 && button_aria_label_value !== (button_aria_label_value = "change inputs to " + /*modes*/
          ctx2[9][
            /*mode*/
            (ctx2[4] + 1) % 3
          ])) {
            attr(button, "aria-label", button_aria_label_value);
          }
        },
        d(detaching) {
          if (detaching)
            detach(button);
          mounted = false;
          dispose();
        }
      };
    }
    function create_fragment$v(ctx) {
      let div;
      let t2;
      function select_block_type(ctx2, dirty) {
        if (
          /*mode*/
          ctx2[4] === 0
        )
          return create_if_block_1$4;
        if (
          /*mode*/
          ctx2[4] === 1
        )
          return create_if_block_3$4;
        return create_else_block$5;
      }
      let current_block_type = select_block_type(ctx);
      let if_block0 = current_block_type(ctx);
      let if_block1 = (
        /*canChangeMode*/
        ctx[3] && create_if_block$9(ctx)
      );
      return {
        c() {
          div = element("div");
          if_block0.c();
          t2 = space();
          if (if_block1)
            if_block1.c();
          attr(div, "class", "text-input svelte-11z4jba");
        },
        m(target, anchor) {
          insert(target, div, anchor);
          if_block0.m(div, null);
          append(div, t2);
          if (if_block1)
            if_block1.m(div, null);
        },
        p(ctx2, [dirty]) {
          if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block0) {
            if_block0.p(ctx2, dirty);
          } else {
            if_block0.d(1);
            if_block0 = current_block_type(ctx2);
            if (if_block0) {
              if_block0.c();
              if_block0.m(div, t2);
            }
          }
          if (
            /*canChangeMode*/
            ctx2[3]
          ) {
            if (if_block1) {
              if_block1.p(ctx2, dirty);
            } else {
              if_block1 = create_if_block$9(ctx2);
              if_block1.c();
              if_block1.m(div, null);
            }
          } else if (if_block1) {
            if_block1.d(1);
            if_block1 = null;
          }
        },
        i: noop,
        o: noop,
        d(detaching) {
          if (detaching)
            detach(div);
          if_block0.d();
          if (if_block1)
            if_block1.d();
        }
      };
    }
    const HEX_COLOR_REGEX = /^#?([A-F0-9]{6}|[A-F0-9]{8})$/i;
    function instance$u($$self, $$props, $$invalidate) {
      let h2;
      let s2;
      let v2;
      let a2;
      let { isAlpha } = $$props;
      let { rgb } = $$props;
      let { hsv } = $$props;
      let { hex } = $$props;
      let { canChangeMode } = $$props;
      const modes = ["HEX", "RGB", "HSV"];
      let mode = 0;
      function updateHex(e2) {
        const target = e2.target;
        if (HEX_COLOR_REGEX.test(target.value)) {
          $$invalidate(1, hex = target.value);
        }
      }
      function updateRgb(property) {
        return function(e2) {
          $$invalidate(0, rgb = __spreadProps(__spreadValues({}, rgb), {
            [property]: parseFloat(e2.target.value)
          }));
        };
      }
      function updateHsv(property) {
        return function(e2) {
          $$invalidate(13, hsv = __spreadProps(__spreadValues({}, hsv), {
            [property]: parseFloat(e2.target.value)
          }));
        };
      }
      const click_handler2 = () => $$invalidate(4, mode = (mode + 1) % 3);
      $$self.$$set = ($$props2) => {
        if ("isAlpha" in $$props2)
          $$invalidate(2, isAlpha = $$props2.isAlpha);
        if ("rgb" in $$props2)
          $$invalidate(0, rgb = $$props2.rgb);
        if ("hsv" in $$props2)
          $$invalidate(13, hsv = $$props2.hsv);
        if ("hex" in $$props2)
          $$invalidate(1, hex = $$props2.hex);
        if ("canChangeMode" in $$props2)
          $$invalidate(3, canChangeMode = $$props2.canChangeMode);
      };
      $$self.$$.update = () => {
        if ($$self.$$.dirty & /*hsv*/
        8192) {
          $$invalidate(8, h2 = Math.round(hsv.h));
        }
        if ($$self.$$.dirty & /*hsv*/
        8192) {
          $$invalidate(7, s2 = Math.round(hsv.s));
        }
        if ($$self.$$.dirty & /*hsv*/
        8192) {
          $$invalidate(6, v2 = Math.round(hsv.v));
        }
        if ($$self.$$.dirty & /*hsv*/
        8192) {
          $$invalidate(5, a2 = hsv.a === void 0 ? 1 : Math.round(hsv.a * 100) / 100);
        }
      };
      return [
        rgb,
        hex,
        isAlpha,
        canChangeMode,
        mode,
        a2,
        v2,
        s2,
        h2,
        modes,
        updateHex,
        updateRgb,
        updateHsv,
        hsv,
        click_handler2
      ];
    }
    class TextInput extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$u, create_fragment$v, safe_not_equal, {
          isAlpha: 2,
          rgb: 0,
          hsv: 13,
          hex: 1,
          canChangeMode: 3
        });
      }
    }
    const SliderIndicator_svelte_svelte_type_style_lang$1 = "";
    function create_fragment$u(ctx) {
      let div;
      return {
        c() {
          div = element("div");
          attr(div, "class", "slider-indicator svelte-13znx8u");
          set_style(
            div,
            "top",
            /*top*/
            ctx[0]
          );
        },
        m(target, anchor) {
          insert(target, div, anchor);
        },
        p(ctx2, [dirty]) {
          if (dirty & /*top*/
          1) {
            set_style(
              div,
              "top",
              /*top*/
              ctx2[0]
            );
          }
        },
        i: noop,
        o: noop,
        d(detaching) {
          if (detaching)
            detach(div);
        }
      };
    }
    function instance$t($$self, $$props, $$invalidate) {
      let top;
      let { pos } = $$props;
      let { toRight } = $$props;
      $$self.$$set = ($$props2) => {
        if ("pos" in $$props2)
          $$invalidate(1, pos = $$props2.pos);
        if ("toRight" in $$props2)
          $$invalidate(2, toRight = $$props2.toRight);
      };
      $$self.$$.update = () => {
        if ($$self.$$.dirty & /*pos*/
        2) {
          $$invalidate(0, top = `calc(${pos} * (var(--picker-height, 200px) - 14px) / 100 + 2px)`);
        }
      };
      return [top, pos, toRight];
    }
    class SliderIndicator extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$t, create_fragment$u, safe_not_equal, { pos: 1, toRight: 2 });
      }
    }
    const PickerIndicator_svelte_svelte_type_style_lang$1 = "";
    function create_fragment$t(ctx) {
      let div;
      let div_style_value;
      return {
        c() {
          div = element("div");
          attr(div, "class", "picker-indicator svelte-1nw247x");
          attr(div, "style", div_style_value = `left: ${/*left*/
          ctx[2]}; top: ${/*top*/
          ctx[1]}; box-shadow: 0 0 4px ${/*isDark*/
          ctx[0] ? "white" : "black"};`);
        },
        m(target, anchor) {
          insert(target, div, anchor);
        },
        p(ctx2, [dirty]) {
          if (dirty & /*left, top, isDark*/
          7 && div_style_value !== (div_style_value = `left: ${/*left*/
          ctx2[2]}; top: ${/*top*/
          ctx2[1]}; box-shadow: 0 0 4px ${/*isDark*/
          ctx2[0] ? "white" : "black"};`)) {
            attr(div, "style", div_style_value);
          }
        },
        i: noop,
        o: noop,
        d(detaching) {
          if (detaching)
            detach(div);
        }
      };
    }
    function instance$s($$self, $$props, $$invalidate) {
      let left;
      let top;
      let { pos } = $$props;
      let { hex } = $$props;
      let { isDark } = $$props;
      $$self.$$set = ($$props2) => {
        if ("pos" in $$props2)
          $$invalidate(3, pos = $$props2.pos);
        if ("hex" in $$props2)
          $$invalidate(4, hex = $$props2.hex);
        if ("isDark" in $$props2)
          $$invalidate(0, isDark = $$props2.isDark);
      };
      $$self.$$.update = () => {
        if ($$self.$$.dirty & /*pos*/
        8) {
          $$invalidate(2, left = `calc(${pos.x} * (var(--picker-width, 200px) - 14px) / 100 + 2px)`);
        }
        if ($$self.$$.dirty & /*pos*/
        8) {
          $$invalidate(1, top = `calc(${pos.y} * (var(--picker-height, 200px) - 14px) / 100 + 2px)`);
        }
      };
      return [isDark, top, left, pos, hex];
    }
    class PickerIndicator extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$s, create_fragment$t, safe_not_equal, { pos: 3, hex: 4, isDark: 0 });
      }
    }
    function create_fragment$s(ctx) {
      let mounted;
      let dispose;
      return {
        c: noop,
        m(target, anchor) {
          if (!mounted) {
            dispose = [
              listen(
                window,
                "keyup",
                /*keyup*/
                ctx[0]
              ),
              listen(
                window,
                "keydown",
                /*keydown*/
                ctx[1]
              )
            ];
            mounted = true;
          }
        },
        p: noop,
        i: noop,
        o: noop,
        d(detaching) {
          mounted = false;
          run_all(dispose);
        }
      };
    }
    function instance$r($$self, $$props, $$invalidate) {
      let $keyPressed;
      component_subscribe($$self, keyPressed, ($$value) => $$invalidate(2, $keyPressed = $$value));
      function keyup(e2) {
        if (["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"].includes(e2.key)) {
          set_store_value(keyPressed, $keyPressed[e2.key] = 0, $keyPressed);
          keyPressed.set($keyPressed);
        }
      }
      function keydown(e2) {
        if (["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"].includes(e2.key)) {
          if (!e2.repeat) {
            set_store_value(keyPressed, $keyPressed[e2.key] = 1, $keyPressed);
            keyPressed.set($keyPressed);
          }
        }
      }
      return [keyup, keydown];
    }
    class ArrowKeyHandler extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$r, create_fragment$s, safe_not_equal, {});
      }
    }
    const PickerWrapper_svelte_svelte_type_style_lang$1 = "";
    function create_fragment$r(ctx) {
      let div;
      let current;
      const default_slot_template = (
        /*#slots*/
        ctx[3].default
      );
      const default_slot = create_slot(
        default_slot_template,
        ctx,
        /*$$scope*/
        ctx[2],
        null
      );
      return {
        c() {
          div = element("div");
          if (default_slot)
            default_slot.c();
          attr(div, "class", "picker-wrapper svelte-1hhmcjg");
          toggle_class(
            div,
            "focused",
            /*focused*/
            ctx[0]
          );
        },
        m(target, anchor) {
          insert(target, div, anchor);
          if (default_slot) {
            default_slot.m(div, null);
          }
          current = true;
        },
        p(ctx2, [dirty]) {
          if (default_slot) {
            if (default_slot.p && (!current || dirty & /*$$scope*/
            4)) {
              update_slot_base(
                default_slot,
                default_slot_template,
                ctx2,
                /*$$scope*/
                ctx2[2],
                !current ? get_all_dirty_from_scope(
                  /*$$scope*/
                  ctx2[2]
                ) : get_slot_changes(
                  default_slot_template,
                  /*$$scope*/
                  ctx2[2],
                  dirty,
                  null
                ),
                null
              );
            }
          }
          if (!current || dirty & /*focused*/
          1) {
            toggle_class(
              div,
              "focused",
              /*focused*/
              ctx2[0]
            );
          }
        },
        i(local) {
          if (current)
            return;
          transition_in(default_slot, local);
          current = true;
        },
        o(local) {
          transition_out(default_slot, local);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(div);
          if (default_slot)
            default_slot.d(detaching);
        }
      };
    }
    function instance$q($$self, $$props, $$invalidate) {
      let { $$slots: slots = {}, $$scope } = $$props;
      let { focused } = $$props;
      let { toRight } = $$props;
      $$self.$$set = ($$props2) => {
        if ("focused" in $$props2)
          $$invalidate(0, focused = $$props2.focused);
        if ("toRight" in $$props2)
          $$invalidate(1, toRight = $$props2.toRight);
        if ("$$scope" in $$props2)
          $$invalidate(2, $$scope = $$props2.$$scope);
      };
      return [focused, toRight, $$scope, slots];
    }
    class PickerWrapper extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$q, create_fragment$r, safe_not_equal, { focused: 0, toRight: 1 });
      }
    }
    const SliderWrapper_svelte_svelte_type_style_lang$1 = "";
    function create_fragment$q(ctx) {
      let div;
      let current;
      const default_slot_template = (
        /*#slots*/
        ctx[3].default
      );
      const default_slot = create_slot(
        default_slot_template,
        ctx,
        /*$$scope*/
        ctx[2],
        null
      );
      return {
        c() {
          div = element("div");
          if (default_slot)
            default_slot.c();
          attr(div, "class", "slider-wrapper svelte-1udewng");
          toggle_class(
            div,
            "focused",
            /*focused*/
            ctx[0]
          );
        },
        m(target, anchor) {
          insert(target, div, anchor);
          if (default_slot) {
            default_slot.m(div, null);
          }
          current = true;
        },
        p(ctx2, [dirty]) {
          if (default_slot) {
            if (default_slot.p && (!current || dirty & /*$$scope*/
            4)) {
              update_slot_base(
                default_slot,
                default_slot_template,
                ctx2,
                /*$$scope*/
                ctx2[2],
                !current ? get_all_dirty_from_scope(
                  /*$$scope*/
                  ctx2[2]
                ) : get_slot_changes(
                  default_slot_template,
                  /*$$scope*/
                  ctx2[2],
                  dirty,
                  null
                ),
                null
              );
            }
          }
          if (!current || dirty & /*focused*/
          1) {
            toggle_class(
              div,
              "focused",
              /*focused*/
              ctx2[0]
            );
          }
        },
        i(local) {
          if (current)
            return;
          transition_in(default_slot, local);
          current = true;
        },
        o(local) {
          transition_out(default_slot, local);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(div);
          if (default_slot)
            default_slot.d(detaching);
        }
      };
    }
    function instance$p($$self, $$props, $$invalidate) {
      let { $$slots: slots = {}, $$scope } = $$props;
      let { focused } = $$props;
      let { toRight } = $$props;
      $$self.$$set = ($$props2) => {
        if ("focused" in $$props2)
          $$invalidate(0, focused = $$props2.focused);
        if ("toRight" in $$props2)
          $$invalidate(1, toRight = $$props2.toRight);
        if ("$$scope" in $$props2)
          $$invalidate(2, $$scope = $$props2.$$scope);
      };
      return [focused, toRight, $$scope, slots];
    }
    class SliderWrapper extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$p, create_fragment$q, safe_not_equal, { focused: 0, toRight: 1 });
      }
    }
    const Input_svelte_svelte_type_style_lang = "";
    function create_fragment$p(ctx) {
      let label_1;
      let div2;
      let input;
      let t0;
      let div0;
      let t1;
      let div1;
      let t2;
      let t3;
      let mounted;
      let dispose;
      return {
        c() {
          label_1 = element("label");
          div2 = element("div");
          input = element("input");
          t0 = space();
          div0 = element("div");
          t1 = space();
          div1 = element("div");
          t2 = space();
          t3 = text(
            /*label*/
            ctx[2]
          );
          attr(input, "type", "color");
          input.value = /*hex*/
          ctx[1];
          attr(input, "aria-haspopup", "dialog");
          attr(input, "class", "svelte-2ybi8r");
          attr(div0, "class", "alpha svelte-2ybi8r");
          attr(div1, "class", "color svelte-2ybi8r");
          set_style(
            div1,
            "background",
            /*hex*/
            ctx[1]
          );
          attr(div2, "class", "container svelte-2ybi8r");
          attr(label_1, "class", "svelte-2ybi8r");
        },
        m(target, anchor) {
          insert(target, label_1, anchor);
          append(label_1, div2);
          append(div2, input);
          append(div2, t0);
          append(div2, div0);
          append(div2, t1);
          append(div2, div1);
          append(label_1, t2);
          append(label_1, t3);
          ctx[4](label_1);
          if (!mounted) {
            dispose = [
              listen(input, "click", prevent_default(click_handler)),
              listen(input, "mousedown", prevent_default(mousedown_handler)),
              listen(label_1, "click", prevent_default(click_handler_1$1)),
              listen(label_1, "mousedown", prevent_default(mousedown_handler_1))
            ];
            mounted = true;
          }
        },
        p(ctx2, [dirty]) {
          if (dirty & /*hex*/
          2) {
            input.value = /*hex*/
            ctx2[1];
          }
          if (dirty & /*hex*/
          2) {
            set_style(
              div1,
              "background",
              /*hex*/
              ctx2[1]
            );
          }
          if (dirty & /*label*/
          4)
            set_data(
              t3,
              /*label*/
              ctx2[2]
            );
        },
        i: noop,
        o: noop,
        d(detaching) {
          if (detaching)
            detach(label_1);
          ctx[4](null);
          mounted = false;
          run_all(dispose);
        }
      };
    }
    const click_handler = () => {
    };
    const mousedown_handler = () => {
    };
    const click_handler_1$1 = () => {
    };
    const mousedown_handler_1 = () => {
    };
    function instance$o($$self, $$props, $$invalidate) {
      let { labelWrapper } = $$props;
      let { hex } = $$props;
      let { label } = $$props;
      let { isOpen } = $$props;
      function label_1_binding($$value) {
        binding_callbacks[$$value ? "unshift" : "push"](() => {
          labelWrapper = $$value;
          $$invalidate(0, labelWrapper);
        });
      }
      $$self.$$set = ($$props2) => {
        if ("labelWrapper" in $$props2)
          $$invalidate(0, labelWrapper = $$props2.labelWrapper);
        if ("hex" in $$props2)
          $$invalidate(1, hex = $$props2.hex);
        if ("label" in $$props2)
          $$invalidate(2, label = $$props2.label);
        if ("isOpen" in $$props2)
          $$invalidate(3, isOpen = $$props2.isOpen);
      };
      return [labelWrapper, hex, label, isOpen, label_1_binding];
    }
    class Input extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$o, create_fragment$p, safe_not_equal, {
          labelWrapper: 0,
          hex: 1,
          label: 2,
          isOpen: 3
        });
      }
    }
    const Wrapper_svelte_svelte_type_style_lang$1 = "";
    function create_fragment$o(ctx) {
      let div;
      let div_role_value;
      let current;
      const default_slot_template = (
        /*#slots*/
        ctx[5].default
      );
      const default_slot = create_slot(
        default_slot_template,
        ctx,
        /*$$scope*/
        ctx[4],
        null
      );
      return {
        c() {
          div = element("div");
          if (default_slot)
            default_slot.c();
          attr(div, "class", "wrapper svelte-6lhts");
          attr(div, "role", div_role_value = /*isPopup*/
          ctx[2] ? "dialog" : void 0);
          attr(div, "aria-label", "color picker");
          toggle_class(
            div,
            "isOpen",
            /*isOpen*/
            ctx[1]
          );
          toggle_class(
            div,
            "isPopup",
            /*isPopup*/
            ctx[2]
          );
        },
        m(target, anchor) {
          insert(target, div, anchor);
          if (default_slot) {
            default_slot.m(div, null);
          }
          ctx[6](div);
          current = true;
        },
        p(ctx2, [dirty]) {
          if (default_slot) {
            if (default_slot.p && (!current || dirty & /*$$scope*/
            16)) {
              update_slot_base(
                default_slot,
                default_slot_template,
                ctx2,
                /*$$scope*/
                ctx2[4],
                !current ? get_all_dirty_from_scope(
                  /*$$scope*/
                  ctx2[4]
                ) : get_slot_changes(
                  default_slot_template,
                  /*$$scope*/
                  ctx2[4],
                  dirty,
                  null
                ),
                null
              );
            }
          }
          if (!current || dirty & /*isPopup*/
          4 && div_role_value !== (div_role_value = /*isPopup*/
          ctx2[2] ? "dialog" : void 0)) {
            attr(div, "role", div_role_value);
          }
          if (!current || dirty & /*isOpen*/
          2) {
            toggle_class(
              div,
              "isOpen",
              /*isOpen*/
              ctx2[1]
            );
          }
          if (!current || dirty & /*isPopup*/
          4) {
            toggle_class(
              div,
              "isPopup",
              /*isPopup*/
              ctx2[2]
            );
          }
        },
        i(local) {
          if (current)
            return;
          transition_in(default_slot, local);
          current = true;
        },
        o(local) {
          transition_out(default_slot, local);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(div);
          if (default_slot)
            default_slot.d(detaching);
          ctx[6](null);
        }
      };
    }
    function instance$n($$self, $$props, $$invalidate) {
      let { $$slots: slots = {}, $$scope } = $$props;
      let { wrapper } = $$props;
      let { isOpen } = $$props;
      let { isPopup } = $$props;
      let { toRight } = $$props;
      function div_binding($$value) {
        binding_callbacks[$$value ? "unshift" : "push"](() => {
          wrapper = $$value;
          $$invalidate(0, wrapper);
        });
      }
      $$self.$$set = ($$props2) => {
        if ("wrapper" in $$props2)
          $$invalidate(0, wrapper = $$props2.wrapper);
        if ("isOpen" in $$props2)
          $$invalidate(1, isOpen = $$props2.isOpen);
        if ("isPopup" in $$props2)
          $$invalidate(2, isPopup = $$props2.isPopup);
        if ("toRight" in $$props2)
          $$invalidate(3, toRight = $$props2.toRight);
        if ("$$scope" in $$props2)
          $$invalidate(4, $$scope = $$props2.$$scope);
      };
      return [wrapper, isOpen, isPopup, toRight, $$scope, slots, div_binding];
    }
    class Wrapper extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$n, create_fragment$o, safe_not_equal, {
          wrapper: 0,
          isOpen: 1,
          isPopup: 2,
          toRight: 3
        });
      }
    }
    const A11yNotice_svelte_svelte_type_style_lang = "";
    function get_each_context$8(ctx, list, i2) {
      const child_ctx = ctx.slice();
      child_ctx[9] = list[i2].contrast;
      child_ctx[10] = list[i2].hex;
      child_ctx[11] = list[i2].placeholder;
      child_ctx[12] = list[i2].reverse;
      child_ctx[13] = list[i2].size;
      return child_ctx;
    }
    function create_each_block$8(ctx) {
      let switch_instance;
      let switch_instance_anchor;
      let current;
      var switch_value = (
        /*components*/
        ctx[0].a11ySingleNotice
      );
      function switch_props(ctx2) {
        return {
          props: {
            contrast: (
              /*contrast*/
              ctx2[9]
            ),
            textColor: (
              /*reverse*/
              ctx2[12] ? (
                /*a11yHex*/
                ctx2[10]
              ) : (
                /*hex*/
                ctx2[1]
              )
            ),
            bgColor: (
              /*reverse*/
              ctx2[12] ? (
                /*hex*/
                ctx2[1]
              ) : (
                /*a11yHex*/
                ctx2[10]
              )
            ),
            placeholder: (
              /*placeholder*/
              ctx2[11]
            ),
            size: (
              /*size*/
              ctx2[13]
            )
          }
        };
      }
      if (switch_value) {
        switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
      }
      return {
        c() {
          if (switch_instance)
            create_component(switch_instance.$$.fragment);
          switch_instance_anchor = empty();
        },
        m(target, anchor) {
          if (switch_instance)
            mount_component(switch_instance, target, anchor);
          insert(target, switch_instance_anchor, anchor);
          current = true;
        },
        p(ctx2, dirty) {
          const switch_instance_changes = {};
          if (dirty & /*_a11yColors*/
          16)
            switch_instance_changes.contrast = /*contrast*/
            ctx2[9];
          if (dirty & /*_a11yColors, hex*/
          18)
            switch_instance_changes.textColor = /*reverse*/
            ctx2[12] ? (
              /*a11yHex*/
              ctx2[10]
            ) : (
              /*hex*/
              ctx2[1]
            );
          if (dirty & /*_a11yColors, hex*/
          18)
            switch_instance_changes.bgColor = /*reverse*/
            ctx2[12] ? (
              /*hex*/
              ctx2[1]
            ) : (
              /*a11yHex*/
              ctx2[10]
            );
          if (dirty & /*_a11yColors*/
          16)
            switch_instance_changes.placeholder = /*placeholder*/
            ctx2[11];
          if (dirty & /*_a11yColors*/
          16)
            switch_instance_changes.size = /*size*/
            ctx2[13];
          if (dirty & /*components*/
          1 && switch_value !== (switch_value = /*components*/
          ctx2[0].a11ySingleNotice)) {
            if (switch_instance) {
              group_outros();
              const old_component = switch_instance;
              transition_out(old_component.$$.fragment, 1, 0, () => {
                destroy_component(old_component, 1);
              });
              check_outros();
            }
            if (switch_value) {
              switch_instance = construct_svelte_component(switch_value, switch_props(ctx2));
              create_component(switch_instance.$$.fragment);
              transition_in(switch_instance.$$.fragment, 1);
              mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
            } else {
              switch_instance = null;
            }
          } else if (switch_value) {
            switch_instance.$set(switch_instance_changes);
          }
        },
        i(local) {
          if (current)
            return;
          if (switch_instance)
            transition_in(switch_instance.$$.fragment, local);
          current = true;
        },
        o(local) {
          if (switch_instance)
            transition_out(switch_instance.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(switch_instance_anchor);
          if (switch_instance)
            destroy_component(switch_instance, detaching);
        }
      };
    }
    function create_if_block$8(ctx) {
      let span;
      return {
        c() {
          span = element("span");
          attr(span, "class", "svelte-1s4dluu");
        },
        m(target, anchor) {
          insert(target, span, anchor);
          span.innerHTML = /*a11yGuidelines*/
          ctx[2];
        },
        p(ctx2, dirty) {
          if (dirty & /*a11yGuidelines*/
          4)
            span.innerHTML = /*a11yGuidelines*/
            ctx2[2];
        },
        d(detaching) {
          if (detaching)
            detach(span);
        }
      };
    }
    function create_fragment$n(ctx) {
      let details;
      let summary;
      let switch_instance;
      let summary_tabindex_value;
      let t0;
      let div;
      let t1;
      let details_class_value;
      let current;
      var switch_value = (
        /*components*/
        ctx[0].a11ySummary
      );
      function switch_props(ctx2) {
        return {
          props: {
            a11yColors: (
              /*_a11yColors*/
              ctx2[4]
            ),
            hex: (
              /*hex*/
              ctx2[1]
            )
          }
        };
      }
      if (switch_value) {
        switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
      }
      let each_value = (
        /*_a11yColors*/
        ctx[4]
      );
      let each_blocks = [];
      for (let i2 = 0; i2 < each_value.length; i2 += 1) {
        each_blocks[i2] = create_each_block$8(get_each_context$8(ctx, each_value, i2));
      }
      const out = (i2) => transition_out(each_blocks[i2], 1, 1, () => {
        each_blocks[i2] = null;
      });
      let if_block = (
        /*a11yGuidelines*/
        ctx[2] && create_if_block$8(ctx)
      );
      return {
        c() {
          details = element("details");
          summary = element("summary");
          if (switch_instance)
            create_component(switch_instance.$$.fragment);
          t0 = space();
          div = element("div");
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            each_blocks[i2].c();
          }
          t1 = space();
          if (if_block)
            if_block.c();
          attr(summary, "tabindex", summary_tabindex_value = /*closable*/
          ctx[5] ? -1 : void 0);
          attr(summary, "class", "svelte-1s4dluu");
          attr(div, "class", "svelte-1s4dluu");
          attr(details, "class", details_class_value = "a11y-notice " + /*closable*/
          (ctx[5] ? "not-closable" : "") + " svelte-1s4dluu");
          details.open = /*isA11yOpen*/
          ctx[3];
        },
        m(target, anchor) {
          insert(target, details, anchor);
          append(details, summary);
          if (switch_instance)
            mount_component(switch_instance, summary, null);
          append(details, t0);
          append(details, div);
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            if (each_blocks[i2]) {
              each_blocks[i2].m(div, null);
            }
          }
          append(div, t1);
          if (if_block)
            if_block.m(div, null);
          current = true;
        },
        p(ctx2, [dirty]) {
          const switch_instance_changes = {};
          if (dirty & /*_a11yColors*/
          16)
            switch_instance_changes.a11yColors = /*_a11yColors*/
            ctx2[4];
          if (dirty & /*hex*/
          2)
            switch_instance_changes.hex = /*hex*/
            ctx2[1];
          if (dirty & /*components*/
          1 && switch_value !== (switch_value = /*components*/
          ctx2[0].a11ySummary)) {
            if (switch_instance) {
              group_outros();
              const old_component = switch_instance;
              transition_out(old_component.$$.fragment, 1, 0, () => {
                destroy_component(old_component, 1);
              });
              check_outros();
            }
            if (switch_value) {
              switch_instance = construct_svelte_component(switch_value, switch_props(ctx2));
              create_component(switch_instance.$$.fragment);
              transition_in(switch_instance.$$.fragment, 1);
              mount_component(switch_instance, summary, null);
            } else {
              switch_instance = null;
            }
          } else if (switch_value) {
            switch_instance.$set(switch_instance_changes);
          }
          if (!current || dirty & /*closable*/
          32 && summary_tabindex_value !== (summary_tabindex_value = /*closable*/
          ctx2[5] ? -1 : void 0)) {
            attr(summary, "tabindex", summary_tabindex_value);
          }
          if (dirty & /*components, _a11yColors, hex*/
          19) {
            each_value = /*_a11yColors*/
            ctx2[4];
            let i2;
            for (i2 = 0; i2 < each_value.length; i2 += 1) {
              const child_ctx = get_each_context$8(ctx2, each_value, i2);
              if (each_blocks[i2]) {
                each_blocks[i2].p(child_ctx, dirty);
                transition_in(each_blocks[i2], 1);
              } else {
                each_blocks[i2] = create_each_block$8(child_ctx);
                each_blocks[i2].c();
                transition_in(each_blocks[i2], 1);
                each_blocks[i2].m(div, t1);
              }
            }
            group_outros();
            for (i2 = each_value.length; i2 < each_blocks.length; i2 += 1) {
              out(i2);
            }
            check_outros();
          }
          if (
            /*a11yGuidelines*/
            ctx2[2]
          ) {
            if (if_block) {
              if_block.p(ctx2, dirty);
            } else {
              if_block = create_if_block$8(ctx2);
              if_block.c();
              if_block.m(div, null);
            }
          } else if (if_block) {
            if_block.d(1);
            if_block = null;
          }
          if (!current || dirty & /*closable*/
          32 && details_class_value !== (details_class_value = "a11y-notice " + /*closable*/
          (ctx2[5] ? "not-closable" : "") + " svelte-1s4dluu")) {
            attr(details, "class", details_class_value);
          }
          if (!current || dirty & /*isA11yOpen*/
          8) {
            details.open = /*isA11yOpen*/
            ctx2[3];
          }
        },
        i(local) {
          if (current)
            return;
          if (switch_instance)
            transition_in(switch_instance.$$.fragment, local);
          for (let i2 = 0; i2 < each_value.length; i2 += 1) {
            transition_in(each_blocks[i2]);
          }
          current = true;
        },
        o(local) {
          if (switch_instance)
            transition_out(switch_instance.$$.fragment, local);
          each_blocks = each_blocks.filter(Boolean);
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            transition_out(each_blocks[i2]);
          }
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(details);
          if (switch_instance)
            destroy_component(switch_instance);
          destroy_each(each_blocks, detaching);
          if (if_block)
            if_block.d();
        }
      };
    }
    function instance$m($$self, $$props, $$invalidate) {
      let closable;
      let _a11yColors;
      let { components } = $$props;
      let { a11yColors } = $$props;
      let { hex } = $$props;
      let { color: color2 } = $$props;
      let { a11yGuidelines } = $$props;
      let { isA11yOpen } = $$props;
      let { isA11yClosable } = $$props;
      $$self.$$set = ($$props2) => {
        if ("components" in $$props2)
          $$invalidate(0, components = $$props2.components);
        if ("a11yColors" in $$props2)
          $$invalidate(6, a11yColors = $$props2.a11yColors);
        if ("hex" in $$props2)
          $$invalidate(1, hex = $$props2.hex);
        if ("color" in $$props2)
          $$invalidate(7, color2 = $$props2.color);
        if ("a11yGuidelines" in $$props2)
          $$invalidate(2, a11yGuidelines = $$props2.a11yGuidelines);
        if ("isA11yOpen" in $$props2)
          $$invalidate(3, isA11yOpen = $$props2.isA11yOpen);
        if ("isA11yClosable" in $$props2)
          $$invalidate(8, isA11yClosable = $$props2.isA11yClosable);
      };
      $$self.$$.update = () => {
        if ($$self.$$.dirty & /*isA11yOpen, isA11yClosable*/
        264) {
          $$invalidate(5, closable = isA11yOpen && !isA11yClosable);
        }
        if ($$self.$$.dirty & /*a11yColors, color*/
        192) {
          $$invalidate(4, _a11yColors = a11yColors.map((a11yColor) => __spreadProps(__spreadValues({}, a11yColor), {
            contrast: color2 == null ? void 0 : color2.contrast(a11yColor.hex)
          })));
        }
      };
      return [
        components,
        hex,
        a11yGuidelines,
        isA11yOpen,
        _a11yColors,
        closable,
        a11yColors,
        color2,
        isA11yClosable
      ];
    }
    class A11yNotice extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$m, create_fragment$n, safe_not_equal, {
          components: 0,
          a11yColors: 6,
          hex: 1,
          color: 7,
          a11yGuidelines: 2,
          isA11yOpen: 3,
          isA11yClosable: 8
        });
      }
    }
    const A11ySingleNotice_svelte_svelte_type_style_lang = "";
    function create_fragment$m(ctx) {
      let div1;
      let p0;
      let t0_value = (
        /*placeholder*/
        (ctx[2] || "Lorem Ipsum") + ""
      );
      let t0;
      let p0_class_value;
      let t1;
      let div0;
      let p1;
      let t2;
      let t3_value = (
        /*contrast*/
        (ctx[3] >= 10 ? (
          /*contrast*/
          ctx[3].toFixed(1)
        ) : (
          /*contrast*/
          ctx[3]
        )) + ""
      );
      let t3;
      let t4;
      let span0;
      let t6;
      let span1;
      return {
        c() {
          div1 = element("div");
          p0 = element("p");
          t0 = text(t0_value);
          t1 = space();
          div0 = element("div");
          p1 = element("p");
          t2 = text("contrast: ");
          t3 = text(t3_value);
          t4 = space();
          span0 = element("span");
          span0.textContent = "AA";
          t6 = space();
          span1 = element("span");
          span1.textContent = "AAA";
          attr(p0, "class", p0_class_value = "lorem " + /*size*/
          (ctx[4] === "large" && "large") + " svelte-obnxge");
          set_style(
            p0,
            "color",
            /*textColor*/
            ctx[0]
          );
          set_style(
            p0,
            "background-color",
            /*bgColor*/
            ctx[1]
          );
          attr(p1, "class", "svelte-obnxge");
          attr(span0, "class", "grade svelte-obnxge");
          toggle_class(
            span0,
            "grade-ok",
            /*contrast*/
            ctx[3] > /*size*/
            (ctx[4] === "large" ? 3 : 4.5)
          );
          attr(span1, "class", "grade svelte-obnxge");
          toggle_class(
            span1,
            "grade-ok",
            /*contrast*/
            ctx[3] > /*size*/
            (ctx[4] === "large" ? 4.5 : 7)
          );
          attr(div0, "class", "score svelte-obnxge");
          attr(div1, "class", "a11y-single-notice svelte-obnxge");
        },
        m(target, anchor) {
          insert(target, div1, anchor);
          append(div1, p0);
          append(p0, t0);
          append(div1, t1);
          append(div1, div0);
          append(div0, p1);
          append(p1, t2);
          append(p1, t3);
          append(div0, t4);
          append(div0, span0);
          append(div0, t6);
          append(div0, span1);
        },
        p(ctx2, [dirty]) {
          if (dirty & /*placeholder*/
          4 && t0_value !== (t0_value = /*placeholder*/
          (ctx2[2] || "Lorem Ipsum") + ""))
            set_data(t0, t0_value);
          if (dirty & /*size*/
          16 && p0_class_value !== (p0_class_value = "lorem " + /*size*/
          (ctx2[4] === "large" && "large") + " svelte-obnxge")) {
            attr(p0, "class", p0_class_value);
          }
          if (dirty & /*textColor*/
          1) {
            set_style(
              p0,
              "color",
              /*textColor*/
              ctx2[0]
            );
          }
          if (dirty & /*bgColor*/
          2) {
            set_style(
              p0,
              "background-color",
              /*bgColor*/
              ctx2[1]
            );
          }
          if (dirty & /*contrast*/
          8 && t3_value !== (t3_value = /*contrast*/
          (ctx2[3] >= 10 ? (
            /*contrast*/
            ctx2[3].toFixed(1)
          ) : (
            /*contrast*/
            ctx2[3]
          )) + ""))
            set_data(t3, t3_value);
          if (dirty & /*contrast, size*/
          24) {
            toggle_class(
              span0,
              "grade-ok",
              /*contrast*/
              ctx2[3] > /*size*/
              (ctx2[4] === "large" ? 3 : 4.5)
            );
          }
          if (dirty & /*contrast, size*/
          24) {
            toggle_class(
              span1,
              "grade-ok",
              /*contrast*/
              ctx2[3] > /*size*/
              (ctx2[4] === "large" ? 4.5 : 7)
            );
          }
        },
        i: noop,
        o: noop,
        d(detaching) {
          if (detaching)
            detach(div1);
        }
      };
    }
    function instance$l($$self, $$props, $$invalidate) {
      let { textColor } = $$props;
      let { bgColor } = $$props;
      let { placeholder = void 0 } = $$props;
      let { contrast = 1 } = $$props;
      let { size = void 0 } = $$props;
      $$self.$$set = ($$props2) => {
        if ("textColor" in $$props2)
          $$invalidate(0, textColor = $$props2.textColor);
        if ("bgColor" in $$props2)
          $$invalidate(1, bgColor = $$props2.bgColor);
        if ("placeholder" in $$props2)
          $$invalidate(2, placeholder = $$props2.placeholder);
        if ("contrast" in $$props2)
          $$invalidate(3, contrast = $$props2.contrast);
        if ("size" in $$props2)
          $$invalidate(4, size = $$props2.size);
      };
      return [textColor, bgColor, placeholder, contrast, size];
    }
    class A11ySingleNotice extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$l, create_fragment$m, safe_not_equal, {
          textColor: 0,
          bgColor: 1,
          placeholder: 2,
          contrast: 3,
          size: 4
        });
      }
    }
    function create_fragment$l(ctx) {
      let t2;
      return {
        c() {
          t2 = text(
            /*message*/
            ctx[0]
          );
        },
        m(target, anchor) {
          insert(target, t2, anchor);
        },
        p(ctx2, [dirty]) {
          if (dirty & /*message*/
          1)
            set_data(
              t2,
              /*message*/
              ctx2[0]
            );
        },
        i: noop,
        o: noop,
        d(detaching) {
          if (detaching)
            detach(t2);
        }
      };
    }
    function getNumberOfGradeFailed({ contrast, size }) {
      if (!contrast) {
        return 1;
      }
      if (size === "large") {
        return contrast < 3 ? 2 : contrast < 4.5 ? 1 : 0;
      } else {
        return contrast < 4.5 ? 2 : contrast < 7 ? 1 : 0;
      }
    }
    function instance$k($$self, $$props, $$invalidate) {
      let count;
      let message;
      let { a11yColors } = $$props;
      let { hex } = $$props;
      $$self.$$set = ($$props2) => {
        if ("a11yColors" in $$props2)
          $$invalidate(1, a11yColors = $$props2.a11yColors);
        if ("hex" in $$props2)
          $$invalidate(2, hex = $$props2.hex);
      };
      $$self.$$.update = () => {
        if ($$self.$$.dirty & /*a11yColors*/
        2) {
          $$invalidate(3, count = a11yColors.map(getNumberOfGradeFailed).reduce((acc, c2) => acc + c2));
        }
        if ($$self.$$.dirty & /*count*/
        8) {
          $$invalidate(0, message = count ? `⚠️ ${count} contrast grade${count && "s"} fail` : "Contrast grade information");
        }
      };
      return [message, a11yColors, hex, count];
    }
    class A11ySummary extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$k, create_fragment$l, safe_not_equal, { a11yColors: 1, hex: 2 });
      }
    }
    const ColorPicker_svelte_svelte_type_style_lang = "";
    function create_else_block$4(ctx) {
      let input;
      return {
        c() {
          input = element("input");
          attr(input, "type", "hidden");
          input.value = /*hex*/
          ctx[2];
        },
        m(target, anchor) {
          insert(target, input, anchor);
        },
        p(ctx2, dirty) {
          if (dirty[0] & /*hex*/
          4) {
            input.value = /*hex*/
            ctx2[2];
          }
        },
        i: noop,
        o: noop,
        d(detaching) {
          if (detaching)
            detach(input);
        }
      };
    }
    function create_if_block_3$3(ctx) {
      let switch_instance;
      let updating_labelWrapper;
      let updating_isOpen;
      let switch_instance_anchor;
      let current;
      function switch_instance_labelWrapper_binding(value) {
        ctx[26](value);
      }
      function switch_instance_isOpen_binding(value) {
        ctx[27](value);
      }
      var switch_value = (
        /*getComponents*/
        ctx[21]().input
      );
      function switch_props(ctx2) {
        let switch_instance_props = {
          hex: (
            /*hex*/
            ctx2[2]
          ),
          label: (
            /*label*/
            ctx2[6]
          )
        };
        if (
          /*labelWrapper*/
          ctx2[19] !== void 0
        ) {
          switch_instance_props.labelWrapper = /*labelWrapper*/
          ctx2[19];
        }
        if (
          /*isOpen*/
          ctx2[3] !== void 0
        ) {
          switch_instance_props.isOpen = /*isOpen*/
          ctx2[3];
        }
        return { props: switch_instance_props };
      }
      if (switch_value) {
        switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
        binding_callbacks.push(() => bind(switch_instance, "labelWrapper", switch_instance_labelWrapper_binding));
        binding_callbacks.push(() => bind(switch_instance, "isOpen", switch_instance_isOpen_binding));
      }
      return {
        c() {
          if (switch_instance)
            create_component(switch_instance.$$.fragment);
          switch_instance_anchor = empty();
        },
        m(target, anchor) {
          if (switch_instance)
            mount_component(switch_instance, target, anchor);
          insert(target, switch_instance_anchor, anchor);
          current = true;
        },
        p(ctx2, dirty) {
          const switch_instance_changes = {};
          if (dirty[0] & /*hex*/
          4)
            switch_instance_changes.hex = /*hex*/
            ctx2[2];
          if (dirty[0] & /*label*/
          64)
            switch_instance_changes.label = /*label*/
            ctx2[6];
          if (!updating_labelWrapper && dirty[0] & /*labelWrapper*/
          524288) {
            updating_labelWrapper = true;
            switch_instance_changes.labelWrapper = /*labelWrapper*/
            ctx2[19];
            add_flush_callback(() => updating_labelWrapper = false);
          }
          if (!updating_isOpen && dirty[0] & /*isOpen*/
          8) {
            updating_isOpen = true;
            switch_instance_changes.isOpen = /*isOpen*/
            ctx2[3];
            add_flush_callback(() => updating_isOpen = false);
          }
          if (switch_value !== (switch_value = /*getComponents*/
          ctx2[21]().input)) {
            if (switch_instance) {
              group_outros();
              const old_component = switch_instance;
              transition_out(old_component.$$.fragment, 1, 0, () => {
                destroy_component(old_component, 1);
              });
              check_outros();
            }
            if (switch_value) {
              switch_instance = construct_svelte_component(switch_value, switch_props(ctx2));
              binding_callbacks.push(() => bind(switch_instance, "labelWrapper", switch_instance_labelWrapper_binding));
              binding_callbacks.push(() => bind(switch_instance, "isOpen", switch_instance_isOpen_binding));
              create_component(switch_instance.$$.fragment);
              transition_in(switch_instance.$$.fragment, 1);
              mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
            } else {
              switch_instance = null;
            }
          } else if (switch_value) {
            switch_instance.$set(switch_instance_changes);
          }
        },
        i(local) {
          if (current)
            return;
          if (switch_instance)
            transition_in(switch_instance.$$.fragment, local);
          current = true;
        },
        o(local) {
          if (switch_instance)
            transition_out(switch_instance.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(switch_instance_anchor);
          if (switch_instance)
            destroy_component(switch_instance, detaching);
        }
      };
    }
    function create_if_block_2$3(ctx) {
      let alpha;
      let updating_a;
      let updating_isOpen;
      let current;
      function alpha_a_binding(value) {
        ctx[32](value);
      }
      function alpha_isOpen_binding(value) {
        ctx[33](value);
      }
      let alpha_props = {
        components: (
          /*getComponents*/
          ctx[21]()
        ),
        hex: (
          /*hex*/
          ctx[2]
        ),
        toRight: (
          /*toRight*/
          ctx[17]
        )
      };
      if (
        /*hsv*/
        ctx[1].a !== void 0
      ) {
        alpha_props.a = /*hsv*/
        ctx[1].a;
      }
      if (
        /*isOpen*/
        ctx[3] !== void 0
      ) {
        alpha_props.isOpen = /*isOpen*/
        ctx[3];
      }
      alpha = new Alpha({ props: alpha_props });
      binding_callbacks.push(() => bind(alpha, "a", alpha_a_binding));
      binding_callbacks.push(() => bind(alpha, "isOpen", alpha_isOpen_binding));
      return {
        c() {
          create_component(alpha.$$.fragment);
        },
        m(target, anchor) {
          mount_component(alpha, target, anchor);
          current = true;
        },
        p(ctx2, dirty) {
          const alpha_changes = {};
          if (dirty[0] & /*hex*/
          4)
            alpha_changes.hex = /*hex*/
            ctx2[2];
          if (dirty[0] & /*toRight*/
          131072)
            alpha_changes.toRight = /*toRight*/
            ctx2[17];
          if (!updating_a && dirty[0] & /*hsv*/
          2) {
            updating_a = true;
            alpha_changes.a = /*hsv*/
            ctx2[1].a;
            add_flush_callback(() => updating_a = false);
          }
          if (!updating_isOpen && dirty[0] & /*isOpen*/
          8) {
            updating_isOpen = true;
            alpha_changes.isOpen = /*isOpen*/
            ctx2[3];
            add_flush_callback(() => updating_isOpen = false);
          }
          alpha.$set(alpha_changes);
        },
        i(local) {
          if (current)
            return;
          transition_in(alpha.$$.fragment, local);
          current = true;
        },
        o(local) {
          transition_out(alpha.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          destroy_component(alpha, detaching);
        }
      };
    }
    function create_if_block_1$3(ctx) {
      let switch_instance;
      let updating_hex;
      let updating_rgb;
      let updating_hsv;
      let switch_instance_anchor;
      let current;
      function switch_instance_hex_binding(value) {
        ctx[34](value);
      }
      function switch_instance_rgb_binding(value) {
        ctx[35](value);
      }
      function switch_instance_hsv_binding(value) {
        ctx[36](value);
      }
      var switch_value = (
        /*getComponents*/
        ctx[21]().textInput
      );
      function switch_props(ctx2) {
        let switch_instance_props = {
          isAlpha: (
            /*isAlpha*/
            ctx2[7]
          ),
          canChangeMode: (
            /*canChangeMode*/
            ctx2[10]
          )
        };
        if (
          /*hex*/
          ctx2[2] !== void 0
        ) {
          switch_instance_props.hex = /*hex*/
          ctx2[2];
        }
        if (
          /*rgb*/
          ctx2[0] !== void 0
        ) {
          switch_instance_props.rgb = /*rgb*/
          ctx2[0];
        }
        if (
          /*hsv*/
          ctx2[1] !== void 0
        ) {
          switch_instance_props.hsv = /*hsv*/
          ctx2[1];
        }
        return { props: switch_instance_props };
      }
      if (switch_value) {
        switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
        binding_callbacks.push(() => bind(switch_instance, "hex", switch_instance_hex_binding));
        binding_callbacks.push(() => bind(switch_instance, "rgb", switch_instance_rgb_binding));
        binding_callbacks.push(() => bind(switch_instance, "hsv", switch_instance_hsv_binding));
      }
      return {
        c() {
          if (switch_instance)
            create_component(switch_instance.$$.fragment);
          switch_instance_anchor = empty();
        },
        m(target, anchor) {
          if (switch_instance)
            mount_component(switch_instance, target, anchor);
          insert(target, switch_instance_anchor, anchor);
          current = true;
        },
        p(ctx2, dirty) {
          const switch_instance_changes = {};
          if (dirty[0] & /*isAlpha*/
          128)
            switch_instance_changes.isAlpha = /*isAlpha*/
            ctx2[7];
          if (dirty[0] & /*canChangeMode*/
          1024)
            switch_instance_changes.canChangeMode = /*canChangeMode*/
            ctx2[10];
          if (!updating_hex && dirty[0] & /*hex*/
          4) {
            updating_hex = true;
            switch_instance_changes.hex = /*hex*/
            ctx2[2];
            add_flush_callback(() => updating_hex = false);
          }
          if (!updating_rgb && dirty[0] & /*rgb*/
          1) {
            updating_rgb = true;
            switch_instance_changes.rgb = /*rgb*/
            ctx2[0];
            add_flush_callback(() => updating_rgb = false);
          }
          if (!updating_hsv && dirty[0] & /*hsv*/
          2) {
            updating_hsv = true;
            switch_instance_changes.hsv = /*hsv*/
            ctx2[1];
            add_flush_callback(() => updating_hsv = false);
          }
          if (switch_value !== (switch_value = /*getComponents*/
          ctx2[21]().textInput)) {
            if (switch_instance) {
              group_outros();
              const old_component = switch_instance;
              transition_out(old_component.$$.fragment, 1, 0, () => {
                destroy_component(old_component, 1);
              });
              check_outros();
            }
            if (switch_value) {
              switch_instance = construct_svelte_component(switch_value, switch_props(ctx2));
              binding_callbacks.push(() => bind(switch_instance, "hex", switch_instance_hex_binding));
              binding_callbacks.push(() => bind(switch_instance, "rgb", switch_instance_rgb_binding));
              binding_callbacks.push(() => bind(switch_instance, "hsv", switch_instance_hsv_binding));
              create_component(switch_instance.$$.fragment);
              transition_in(switch_instance.$$.fragment, 1);
              mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
            } else {
              switch_instance = null;
            }
          } else if (switch_value) {
            switch_instance.$set(switch_instance_changes);
          }
        },
        i(local) {
          if (current)
            return;
          if (switch_instance)
            transition_in(switch_instance.$$.fragment, local);
          current = true;
        },
        o(local) {
          if (switch_instance)
            transition_out(switch_instance.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(switch_instance_anchor);
          if (switch_instance)
            destroy_component(switch_instance, detaching);
        }
      };
    }
    function create_if_block$7(ctx) {
      let switch_instance;
      let switch_instance_anchor;
      let current;
      var switch_value = (
        /*getComponents*/
        ctx[21]().a11yNotice
      );
      function switch_props(ctx2) {
        return {
          props: {
            components: (
              /*getComponents*/
              ctx2[21]()
            ),
            a11yColors: (
              /*a11yColors*/
              ctx2[12]
            ),
            color: (
              /*color*/
              ctx2[4]
            ),
            hex: (
              /*hex*/
              ctx2[2]
            ),
            a11yGuidelines: (
              /*a11yGuidelines*/
              ctx2[13]
            ),
            isA11yOpen: (
              /*isA11yOpen*/
              ctx2[14]
            ),
            isA11yClosable: (
              /*isA11yClosable*/
              ctx2[15]
            )
          }
        };
      }
      if (switch_value) {
        switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
      }
      return {
        c() {
          if (switch_instance)
            create_component(switch_instance.$$.fragment);
          switch_instance_anchor = empty();
        },
        m(target, anchor) {
          if (switch_instance)
            mount_component(switch_instance, target, anchor);
          insert(target, switch_instance_anchor, anchor);
          current = true;
        },
        p(ctx2, dirty) {
          const switch_instance_changes = {};
          if (dirty[0] & /*a11yColors*/
          4096)
            switch_instance_changes.a11yColors = /*a11yColors*/
            ctx2[12];
          if (dirty[0] & /*color*/
          16)
            switch_instance_changes.color = /*color*/
            ctx2[4];
          if (dirty[0] & /*hex*/
          4)
            switch_instance_changes.hex = /*hex*/
            ctx2[2];
          if (dirty[0] & /*a11yGuidelines*/
          8192)
            switch_instance_changes.a11yGuidelines = /*a11yGuidelines*/
            ctx2[13];
          if (dirty[0] & /*isA11yOpen*/
          16384)
            switch_instance_changes.isA11yOpen = /*isA11yOpen*/
            ctx2[14];
          if (dirty[0] & /*isA11yClosable*/
          32768)
            switch_instance_changes.isA11yClosable = /*isA11yClosable*/
            ctx2[15];
          if (switch_value !== (switch_value = /*getComponents*/
          ctx2[21]().a11yNotice)) {
            if (switch_instance) {
              group_outros();
              const old_component = switch_instance;
              transition_out(old_component.$$.fragment, 1, 0, () => {
                destroy_component(old_component, 1);
              });
              check_outros();
            }
            if (switch_value) {
              switch_instance = construct_svelte_component(switch_value, switch_props(ctx2));
              create_component(switch_instance.$$.fragment);
              transition_in(switch_instance.$$.fragment, 1);
              mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
            } else {
              switch_instance = null;
            }
          } else if (switch_value) {
            switch_instance.$set(switch_instance_changes);
          }
        },
        i(local) {
          if (current)
            return;
          if (switch_instance)
            transition_in(switch_instance.$$.fragment, local);
          current = true;
        },
        o(local) {
          if (switch_instance)
            transition_out(switch_instance.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(switch_instance_anchor);
          if (switch_instance)
            destroy_component(switch_instance, detaching);
        }
      };
    }
    function create_default_slot$1(ctx) {
      let picker;
      let updating_s;
      let updating_v;
      let updating_isOpen;
      let t0;
      let slider;
      let updating_h;
      let t1;
      let t2;
      let t3;
      let if_block2_anchor;
      let current;
      function picker_s_binding(value) {
        ctx[28](value);
      }
      function picker_v_binding(value) {
        ctx[29](value);
      }
      function picker_isOpen_binding(value) {
        ctx[30](value);
      }
      let picker_props = {
        components: (
          /*getComponents*/
          ctx[21]()
        ),
        h: (
          /*hsv*/
          ctx[1].h
        ),
        toRight: (
          /*toRight*/
          ctx[17]
        ),
        isDark: (
          /*isDark*/
          ctx[5]
        )
      };
      if (
        /*hsv*/
        ctx[1].s !== void 0
      ) {
        picker_props.s = /*hsv*/
        ctx[1].s;
      }
      if (
        /*hsv*/
        ctx[1].v !== void 0
      ) {
        picker_props.v = /*hsv*/
        ctx[1].v;
      }
      if (
        /*isOpen*/
        ctx[3] !== void 0
      ) {
        picker_props.isOpen = /*isOpen*/
        ctx[3];
      }
      picker = new Picker({ props: picker_props });
      binding_callbacks.push(() => bind(picker, "s", picker_s_binding));
      binding_callbacks.push(() => bind(picker, "v", picker_v_binding));
      binding_callbacks.push(() => bind(picker, "isOpen", picker_isOpen_binding));
      function slider_h_binding(value) {
        ctx[31](value);
      }
      let slider_props = {
        components: (
          /*getComponents*/
          ctx[21]()
        ),
        toRight: (
          /*toRight*/
          ctx[17]
        )
      };
      if (
        /*hsv*/
        ctx[1].h !== void 0
      ) {
        slider_props.h = /*hsv*/
        ctx[1].h;
      }
      slider = new Slider({ props: slider_props });
      binding_callbacks.push(() => bind(slider, "h", slider_h_binding));
      let if_block0 = (
        /*isAlpha*/
        ctx[7] && create_if_block_2$3(ctx)
      );
      let if_block1 = (
        /*isTextInput*/
        ctx[9] && create_if_block_1$3(ctx)
      );
      let if_block2 = (
        /*isA11y*/
        ctx[11] && create_if_block$7(ctx)
      );
      return {
        c() {
          create_component(picker.$$.fragment);
          t0 = space();
          create_component(slider.$$.fragment);
          t1 = space();
          if (if_block0)
            if_block0.c();
          t2 = space();
          if (if_block1)
            if_block1.c();
          t3 = space();
          if (if_block2)
            if_block2.c();
          if_block2_anchor = empty();
        },
        m(target, anchor) {
          mount_component(picker, target, anchor);
          insert(target, t0, anchor);
          mount_component(slider, target, anchor);
          insert(target, t1, anchor);
          if (if_block0)
            if_block0.m(target, anchor);
          insert(target, t2, anchor);
          if (if_block1)
            if_block1.m(target, anchor);
          insert(target, t3, anchor);
          if (if_block2)
            if_block2.m(target, anchor);
          insert(target, if_block2_anchor, anchor);
          current = true;
        },
        p(ctx2, dirty) {
          const picker_changes = {};
          if (dirty[0] & /*hsv*/
          2)
            picker_changes.h = /*hsv*/
            ctx2[1].h;
          if (dirty[0] & /*toRight*/
          131072)
            picker_changes.toRight = /*toRight*/
            ctx2[17];
          if (dirty[0] & /*isDark*/
          32)
            picker_changes.isDark = /*isDark*/
            ctx2[5];
          if (!updating_s && dirty[0] & /*hsv*/
          2) {
            updating_s = true;
            picker_changes.s = /*hsv*/
            ctx2[1].s;
            add_flush_callback(() => updating_s = false);
          }
          if (!updating_v && dirty[0] & /*hsv*/
          2) {
            updating_v = true;
            picker_changes.v = /*hsv*/
            ctx2[1].v;
            add_flush_callback(() => updating_v = false);
          }
          if (!updating_isOpen && dirty[0] & /*isOpen*/
          8) {
            updating_isOpen = true;
            picker_changes.isOpen = /*isOpen*/
            ctx2[3];
            add_flush_callback(() => updating_isOpen = false);
          }
          picker.$set(picker_changes);
          const slider_changes = {};
          if (dirty[0] & /*toRight*/
          131072)
            slider_changes.toRight = /*toRight*/
            ctx2[17];
          if (!updating_h && dirty[0] & /*hsv*/
          2) {
            updating_h = true;
            slider_changes.h = /*hsv*/
            ctx2[1].h;
            add_flush_callback(() => updating_h = false);
          }
          slider.$set(slider_changes);
          if (
            /*isAlpha*/
            ctx2[7]
          ) {
            if (if_block0) {
              if_block0.p(ctx2, dirty);
              if (dirty[0] & /*isAlpha*/
              128) {
                transition_in(if_block0, 1);
              }
            } else {
              if_block0 = create_if_block_2$3(ctx2);
              if_block0.c();
              transition_in(if_block0, 1);
              if_block0.m(t2.parentNode, t2);
            }
          } else if (if_block0) {
            group_outros();
            transition_out(if_block0, 1, 1, () => {
              if_block0 = null;
            });
            check_outros();
          }
          if (
            /*isTextInput*/
            ctx2[9]
          ) {
            if (if_block1) {
              if_block1.p(ctx2, dirty);
              if (dirty[0] & /*isTextInput*/
              512) {
                transition_in(if_block1, 1);
              }
            } else {
              if_block1 = create_if_block_1$3(ctx2);
              if_block1.c();
              transition_in(if_block1, 1);
              if_block1.m(t3.parentNode, t3);
            }
          } else if (if_block1) {
            group_outros();
            transition_out(if_block1, 1, 1, () => {
              if_block1 = null;
            });
            check_outros();
          }
          if (
            /*isA11y*/
            ctx2[11]
          ) {
            if (if_block2) {
              if_block2.p(ctx2, dirty);
              if (dirty[0] & /*isA11y*/
              2048) {
                transition_in(if_block2, 1);
              }
            } else {
              if_block2 = create_if_block$7(ctx2);
              if_block2.c();
              transition_in(if_block2, 1);
              if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
            }
          } else if (if_block2) {
            group_outros();
            transition_out(if_block2, 1, 1, () => {
              if_block2 = null;
            });
            check_outros();
          }
        },
        i(local) {
          if (current)
            return;
          transition_in(picker.$$.fragment, local);
          transition_in(slider.$$.fragment, local);
          transition_in(if_block0);
          transition_in(if_block1);
          transition_in(if_block2);
          current = true;
        },
        o(local) {
          transition_out(picker.$$.fragment, local);
          transition_out(slider.$$.fragment, local);
          transition_out(if_block0);
          transition_out(if_block1);
          transition_out(if_block2);
          current = false;
        },
        d(detaching) {
          destroy_component(picker, detaching);
          if (detaching)
            detach(t0);
          destroy_component(slider, detaching);
          if (detaching)
            detach(t1);
          if (if_block0)
            if_block0.d(detaching);
          if (detaching)
            detach(t2);
          if (if_block1)
            if_block1.d(detaching);
          if (detaching)
            detach(t3);
          if (if_block2)
            if_block2.d(detaching);
          if (detaching)
            detach(if_block2_anchor);
        }
      };
    }
    function create_fragment$k(ctx) {
      let arrowkeyhandler;
      let t0;
      let span_1;
      let current_block_type_index;
      let if_block;
      let t1;
      let switch_instance;
      let updating_wrapper;
      let current;
      let mounted;
      let dispose;
      arrowkeyhandler = new ArrowKeyHandler({});
      const if_block_creators = [create_if_block_3$3, create_else_block$4];
      const if_blocks = [];
      function select_block_type(ctx2, dirty) {
        if (
          /*isInput*/
          ctx2[8]
        )
          return 0;
        return 1;
      }
      current_block_type_index = select_block_type(ctx);
      if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
      function switch_instance_wrapper_binding(value) {
        ctx[37](value);
      }
      var switch_value = (
        /*getComponents*/
        ctx[21]().wrapper
      );
      function switch_props(ctx2) {
        let switch_instance_props = {
          isOpen: (
            /*isOpen*/
            ctx2[3]
          ),
          isPopup: (
            /*isPopup*/
            ctx2[16]
          ),
          toRight: (
            /*toRight*/
            ctx2[17]
          ),
          $$slots: { default: [create_default_slot$1] },
          $$scope: { ctx: ctx2 }
        };
        if (
          /*wrapper*/
          ctx2[20] !== void 0
        ) {
          switch_instance_props.wrapper = /*wrapper*/
          ctx2[20];
        }
        return { props: switch_instance_props };
      }
      if (switch_value) {
        switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
        binding_callbacks.push(() => bind(switch_instance, "wrapper", switch_instance_wrapper_binding));
      }
      return {
        c() {
          create_component(arrowkeyhandler.$$.fragment);
          t0 = space();
          span_1 = element("span");
          if_block.c();
          t1 = space();
          if (switch_instance)
            create_component(switch_instance.$$.fragment);
          attr(span_1, "class", "color-picker svelte-7ntk55");
        },
        m(target, anchor) {
          mount_component(arrowkeyhandler, target, anchor);
          insert(target, t0, anchor);
          insert(target, span_1, anchor);
          if_blocks[current_block_type_index].m(span_1, null);
          append(span_1, t1);
          if (switch_instance)
            mount_component(switch_instance, span_1, null);
          ctx[38](span_1);
          current = true;
          if (!mounted) {
            dispose = [
              listen(
                window,
                "mousedown",
                /*mousedown*/
                ctx[22]
              ),
              listen(
                window,
                "keyup",
                /*keyup*/
                ctx[23]
              )
            ];
            mounted = true;
          }
        },
        p(ctx2, dirty) {
          let previous_block_index = current_block_type_index;
          current_block_type_index = select_block_type(ctx2);
          if (current_block_type_index === previous_block_index) {
            if_blocks[current_block_type_index].p(ctx2, dirty);
          } else {
            group_outros();
            transition_out(if_blocks[previous_block_index], 1, 1, () => {
              if_blocks[previous_block_index] = null;
            });
            check_outros();
            if_block = if_blocks[current_block_type_index];
            if (!if_block) {
              if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
              if_block.c();
            } else {
              if_block.p(ctx2, dirty);
            }
            transition_in(if_block, 1);
            if_block.m(span_1, t1);
          }
          const switch_instance_changes = {};
          if (dirty[0] & /*isOpen*/
          8)
            switch_instance_changes.isOpen = /*isOpen*/
            ctx2[3];
          if (dirty[0] & /*isPopup*/
          65536)
            switch_instance_changes.isPopup = /*isPopup*/
            ctx2[16];
          if (dirty[0] & /*toRight*/
          131072)
            switch_instance_changes.toRight = /*toRight*/
            ctx2[17];
          if (dirty[0] & /*a11yColors, color, hex, a11yGuidelines, isA11yOpen, isA11yClosable, isA11y, isAlpha, canChangeMode, rgb, hsv, isTextInput, toRight, isOpen, isDark*/
          196287 | dirty[1] & /*$$scope*/
          16384) {
            switch_instance_changes.$$scope = { dirty, ctx: ctx2 };
          }
          if (!updating_wrapper && dirty[0] & /*wrapper*/
          1048576) {
            updating_wrapper = true;
            switch_instance_changes.wrapper = /*wrapper*/
            ctx2[20];
            add_flush_callback(() => updating_wrapper = false);
          }
          if (switch_value !== (switch_value = /*getComponents*/
          ctx2[21]().wrapper)) {
            if (switch_instance) {
              group_outros();
              const old_component = switch_instance;
              transition_out(old_component.$$.fragment, 1, 0, () => {
                destroy_component(old_component, 1);
              });
              check_outros();
            }
            if (switch_value) {
              switch_instance = construct_svelte_component(switch_value, switch_props(ctx2));
              binding_callbacks.push(() => bind(switch_instance, "wrapper", switch_instance_wrapper_binding));
              create_component(switch_instance.$$.fragment);
              transition_in(switch_instance.$$.fragment, 1);
              mount_component(switch_instance, span_1, null);
            } else {
              switch_instance = null;
            }
          } else if (switch_value) {
            switch_instance.$set(switch_instance_changes);
          }
        },
        i(local) {
          if (current)
            return;
          transition_in(arrowkeyhandler.$$.fragment, local);
          transition_in(if_block);
          if (switch_instance)
            transition_in(switch_instance.$$.fragment, local);
          current = true;
        },
        o(local) {
          transition_out(arrowkeyhandler.$$.fragment, local);
          transition_out(if_block);
          if (switch_instance)
            transition_out(switch_instance.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          destroy_component(arrowkeyhandler, detaching);
          if (detaching)
            detach(t0);
          if (detaching)
            detach(span_1);
          if_blocks[current_block_type_index].d();
          if (switch_instance)
            destroy_component(switch_instance);
          ctx[38](null);
          mounted = false;
          run_all(dispose);
        }
      };
    }
    function instance$j($$self, $$props, $$invalidate) {
      k([a11yPlugin]);
      let { components = {} } = $$props;
      const dispatch = createEventDispatcher();
      let { label = "Choose a color" } = $$props;
      let { isAlpha = true } = $$props;
      let { isInput = true } = $$props;
      let { isTextInput = true } = $$props;
      let { canChangeMode = true } = $$props;
      let { isA11y = false } = $$props;
      let { a11yColors = [{ hex: "#ffffff" }] } = $$props;
      let { a11yGuidelines = '<p style="margin: 0; font-size: 12px;">Learn more at <a href="https://webaim.org/articles/contrast/" target="_blank">WebAIM contrast guide</a></p>' } = $$props;
      let { isA11yOpen = false } = $$props;
      let { isA11yClosable = true } = $$props;
      let { isPopup = isInput } = $$props;
      let { isOpen = !isInput } = $$props;
      let { toRight = false } = $$props;
      let { disableCloseClickOutside = false } = $$props;
      let { rgb = { r: 255, g: 0, b: 0, a: 1 } } = $$props;
      let { hsv = { h: 0, s: 100, v: 100, a: 1 } } = $$props;
      let { hex = "#ff0000" } = $$props;
      let { color: color2 = void 0 } = $$props;
      let { isDark = false } = $$props;
      let _rgb = { r: 255, g: 0, b: 0, a: 1 };
      let _hsv = { h: 0, s: 100, v: 100, a: 1 };
      let _hex = "#ff0000";
      let span;
      const default_components = {
        sliderIndicator: SliderIndicator,
        pickerIndicator: PickerIndicator,
        alphaIndicator: SliderIndicator,
        pickerWrapper: PickerWrapper,
        sliderWrapper: SliderWrapper,
        alphaWrapper: SliderWrapper,
        textInput: TextInput,
        a11yNotice: A11yNotice,
        a11ySingleNotice: A11ySingleNotice,
        a11ySummary: A11ySummary,
        input: Input,
        wrapper: Wrapper
      };
      function getComponents() {
        return __spreadValues(__spreadValues({}, default_components), components);
      }
      let labelWrapper;
      let wrapper;
      function mousedown({ target }) {
        if (isInput) {
          if (labelWrapper.contains(target) || labelWrapper.isSameNode(target)) {
            $$invalidate(3, isOpen = !isOpen);
          } else if (isOpen && !wrapper.contains(target) && !disableCloseClickOutside) {
            $$invalidate(3, isOpen = false);
          }
        }
      }
      function keyup(e2) {
        if (e2.key === "Tab" && isPopup) {
          $$invalidate(3, isOpen = span == null ? void 0 : span.contains(document.activeElement));
        }
      }
      function updateColor() {
        if (hsv.h === _hsv.h && hsv.s === _hsv.s && hsv.v === _hsv.v && hsv.a === _hsv.a && rgb.r === _rgb.r && rgb.g === _rgb.g && rgb.b === _rgb.b && rgb.a === _rgb.a && hex === _hex) {
          return;
        }
        if (hsv.a === void 0)
          $$invalidate(1, hsv.a = 1, hsv);
        if (_hsv.a === void 0)
          _hsv.a = 1;
        if (rgb.a === void 0)
          $$invalidate(0, rgb.a = 1, rgb);
        if (_rgb.a === void 0)
          _rgb.a = 1;
        if ((hex == null ? void 0 : hex.substring(7)) === "ff")
          $$invalidate(2, hex = hex.substring(0, 7));
        if ((hex == null ? void 0 : hex.substring(7)) === "ff")
          $$invalidate(2, hex = hex.substring(0, 7));
        if (hsv.h !== _hsv.h || hsv.s !== _hsv.s || hsv.v !== _hsv.v || hsv.a !== _hsv.a) {
          $$invalidate(4, color2 = w(hsv));
          $$invalidate(0, rgb = color2.toRgb());
          $$invalidate(2, hex = color2.toHex());
        } else if (rgb.r !== _rgb.r || rgb.g !== _rgb.g || rgb.b !== _rgb.b || rgb.a !== _rgb.a) {
          $$invalidate(4, color2 = w(rgb));
          $$invalidate(2, hex = color2.toHex());
          $$invalidate(1, hsv = color2.toHsv());
        } else if (hex !== _hex) {
          $$invalidate(4, color2 = w(hex));
          $$invalidate(0, rgb = color2.toRgb());
          $$invalidate(1, hsv = color2.toHsv());
        }
        if (color2) {
          $$invalidate(5, isDark = color2.isDark());
        }
        _hsv = Object.assign({}, hsv);
        _rgb = Object.assign({}, rgb);
        _hex = hex;
        dispatch("input", { color: color2, hsv, rgb, hex });
      }
      function switch_instance_labelWrapper_binding(value) {
        labelWrapper = value;
        $$invalidate(19, labelWrapper);
      }
      function switch_instance_isOpen_binding(value) {
        isOpen = value;
        $$invalidate(3, isOpen);
      }
      function picker_s_binding(value) {
        if ($$self.$$.not_equal(hsv.s, value)) {
          hsv.s = value;
          $$invalidate(1, hsv);
        }
      }
      function picker_v_binding(value) {
        if ($$self.$$.not_equal(hsv.v, value)) {
          hsv.v = value;
          $$invalidate(1, hsv);
        }
      }
      function picker_isOpen_binding(value) {
        isOpen = value;
        $$invalidate(3, isOpen);
      }
      function slider_h_binding(value) {
        if ($$self.$$.not_equal(hsv.h, value)) {
          hsv.h = value;
          $$invalidate(1, hsv);
        }
      }
      function alpha_a_binding(value) {
        if ($$self.$$.not_equal(hsv.a, value)) {
          hsv.a = value;
          $$invalidate(1, hsv);
        }
      }
      function alpha_isOpen_binding(value) {
        isOpen = value;
        $$invalidate(3, isOpen);
      }
      function switch_instance_hex_binding(value) {
        hex = value;
        $$invalidate(2, hex);
      }
      function switch_instance_rgb_binding(value) {
        rgb = value;
        $$invalidate(0, rgb);
      }
      function switch_instance_hsv_binding(value) {
        hsv = value;
        $$invalidate(1, hsv);
      }
      function switch_instance_wrapper_binding(value) {
        wrapper = value;
        $$invalidate(20, wrapper);
      }
      function span_1_binding($$value) {
        binding_callbacks[$$value ? "unshift" : "push"](() => {
          span = $$value;
          $$invalidate(18, span);
        });
      }
      $$self.$$set = ($$props2) => {
        if ("components" in $$props2)
          $$invalidate(24, components = $$props2.components);
        if ("label" in $$props2)
          $$invalidate(6, label = $$props2.label);
        if ("isAlpha" in $$props2)
          $$invalidate(7, isAlpha = $$props2.isAlpha);
        if ("isInput" in $$props2)
          $$invalidate(8, isInput = $$props2.isInput);
        if ("isTextInput" in $$props2)
          $$invalidate(9, isTextInput = $$props2.isTextInput);
        if ("canChangeMode" in $$props2)
          $$invalidate(10, canChangeMode = $$props2.canChangeMode);
        if ("isA11y" in $$props2)
          $$invalidate(11, isA11y = $$props2.isA11y);
        if ("a11yColors" in $$props2)
          $$invalidate(12, a11yColors = $$props2.a11yColors);
        if ("a11yGuidelines" in $$props2)
          $$invalidate(13, a11yGuidelines = $$props2.a11yGuidelines);
        if ("isA11yOpen" in $$props2)
          $$invalidate(14, isA11yOpen = $$props2.isA11yOpen);
        if ("isA11yClosable" in $$props2)
          $$invalidate(15, isA11yClosable = $$props2.isA11yClosable);
        if ("isPopup" in $$props2)
          $$invalidate(16, isPopup = $$props2.isPopup);
        if ("isOpen" in $$props2)
          $$invalidate(3, isOpen = $$props2.isOpen);
        if ("toRight" in $$props2)
          $$invalidate(17, toRight = $$props2.toRight);
        if ("disableCloseClickOutside" in $$props2)
          $$invalidate(25, disableCloseClickOutside = $$props2.disableCloseClickOutside);
        if ("rgb" in $$props2)
          $$invalidate(0, rgb = $$props2.rgb);
        if ("hsv" in $$props2)
          $$invalidate(1, hsv = $$props2.hsv);
        if ("hex" in $$props2)
          $$invalidate(2, hex = $$props2.hex);
        if ("color" in $$props2)
          $$invalidate(4, color2 = $$props2.color);
        if ("isDark" in $$props2)
          $$invalidate(5, isDark = $$props2.isDark);
      };
      $$self.$$.update = () => {
        if ($$self.$$.dirty[0] & /*hsv, rgb, hex*/
        7) {
          if (hsv || rgb || hex) {
            updateColor();
          }
        }
      };
      return [
        rgb,
        hsv,
        hex,
        isOpen,
        color2,
        isDark,
        label,
        isAlpha,
        isInput,
        isTextInput,
        canChangeMode,
        isA11y,
        a11yColors,
        a11yGuidelines,
        isA11yOpen,
        isA11yClosable,
        isPopup,
        toRight,
        span,
        labelWrapper,
        wrapper,
        getComponents,
        mousedown,
        keyup,
        components,
        disableCloseClickOutside,
        switch_instance_labelWrapper_binding,
        switch_instance_isOpen_binding,
        picker_s_binding,
        picker_v_binding,
        picker_isOpen_binding,
        slider_h_binding,
        alpha_a_binding,
        alpha_isOpen_binding,
        switch_instance_hex_binding,
        switch_instance_rgb_binding,
        switch_instance_hsv_binding,
        switch_instance_wrapper_binding,
        span_1_binding
      ];
    }
    class ColorPicker extends SvelteComponent {
      constructor(options) {
        super();
        init$1(
          this,
          options,
          instance$j,
          create_fragment$k,
          safe_not_equal,
          {
            components: 24,
            label: 6,
            isAlpha: 7,
            isInput: 8,
            isTextInput: 9,
            canChangeMode: 10,
            isA11y: 11,
            a11yColors: 12,
            a11yGuidelines: 13,
            isA11yOpen: 14,
            isA11yClosable: 15,
            isPopup: 16,
            isOpen: 3,
            toRight: 17,
            disableCloseClickOutside: 25,
            rgb: 0,
            hsv: 1,
            hex: 2,
            color: 4,
            isDark: 5
          },
          null,
          [-1, -1]
        );
      }
    }
    const PickerIndicator_svelte_svelte_type_style_lang = "";
    const PickerWrapper_svelte_svelte_type_style_lang = "";
    const SliderIndicator_svelte_svelte_type_style_lang = "";
    const SliderWrapper_svelte_svelte_type_style_lang = "";
    const Wrapper_svelte_svelte_type_style_lang = "";
    const A11yHorizontalWrapper_svelte_svelte_type_style_lang = "";
    function create_fragment$j(ctx) {
      let colorpicker;
      let updating_hex;
      let t0;
      let br;
      let t1;
      let input;
      let updating_value;
      let current;
      function colorpicker_hex_binding(value) {
        ctx[4](value);
      }
      let colorpicker_props = { class: "color-picker", label: "" };
      if (
        /*hex*/
        ctx[0] !== void 0
      ) {
        colorpicker_props.hex = /*hex*/
        ctx[0];
      }
      colorpicker = new ColorPicker({ props: colorpicker_props });
      binding_callbacks.push(() => bind(colorpicker, "hex", colorpicker_hex_binding));
      colorpicker.$on(
        "input",
        /*onUpdateValue*/
        ctx[2]
      );
      function input_value_binding(value) {
        ctx[5](value);
      }
      let input_props = { id: "attr_" + /*id*/
      ctx[1] + "_title" };
      if (
        /*hex*/
        ctx[0] !== void 0
      ) {
        input_props.value = /*hex*/
        ctx[0];
      }
      input = new Input$1({ props: input_props });
      binding_callbacks.push(() => bind(input, "value", input_value_binding));
      return {
        c() {
          create_component(colorpicker.$$.fragment);
          t0 = space();
          br = element("br");
          t1 = space();
          create_component(input.$$.fragment);
        },
        m(target, anchor) {
          mount_component(colorpicker, target, anchor);
          insert(target, t0, anchor);
          insert(target, br, anchor);
          insert(target, t1, anchor);
          mount_component(input, target, anchor);
          current = true;
        },
        p(ctx2, [dirty]) {
          const colorpicker_changes = {};
          if (!updating_hex && dirty & /*hex*/
          1) {
            updating_hex = true;
            colorpicker_changes.hex = /*hex*/
            ctx2[0];
            add_flush_callback(() => updating_hex = false);
          }
          colorpicker.$set(colorpicker_changes);
          const input_changes = {};
          if (dirty & /*id*/
          2)
            input_changes.id = "attr_" + /*id*/
            ctx2[1] + "_title";
          if (!updating_value && dirty & /*hex*/
          1) {
            updating_value = true;
            input_changes.value = /*hex*/
            ctx2[0];
            add_flush_callback(() => updating_value = false);
          }
          input.$set(input_changes);
        },
        i(local) {
          if (current)
            return;
          transition_in(colorpicker.$$.fragment, local);
          transition_in(input.$$.fragment, local);
          current = true;
        },
        o(local) {
          transition_out(colorpicker.$$.fragment, local);
          transition_out(input.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          destroy_component(colorpicker, detaching);
          if (detaching)
            detach(t0);
          if (detaching)
            detach(br);
          if (detaching)
            detach(t1);
          destroy_component(input, detaching);
        }
      };
    }
    function instance$i($$self, $$props, $$invalidate) {
      let { hex } = $$props;
      let { id } = $$props;
      let { onUpdate = () => {
      } } = $$props;
      function onUpdateValue(v2) {
        $$invalidate(0, hex = v2.detail.hex);
        onUpdate(id, hex);
      }
      function colorpicker_hex_binding(value) {
        hex = value;
        $$invalidate(0, hex);
      }
      function input_value_binding(value) {
        hex = value;
        $$invalidate(0, hex);
      }
      $$self.$$set = ($$props2) => {
        if ("hex" in $$props2)
          $$invalidate(0, hex = $$props2.hex);
        if ("id" in $$props2)
          $$invalidate(1, id = $$props2.id);
        if ("onUpdate" in $$props2)
          $$invalidate(3, onUpdate = $$props2.onUpdate);
      };
      return [hex, id, onUpdateValue, onUpdate, colorpicker_hex_binding, input_value_binding];
    }
    class ColorPicker_1 extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$i, create_fragment$j, safe_not_equal, { hex: 0, id: 1, onUpdate: 3 });
      }
    }
    const Color_svelte_svelte_type_style_lang = "";
    function create_fragment$i(ctx) {
      let div;
      return {
        c() {
          div = element("div");
          attr(div, "class", "color svelte-7ifhnj");
          set_style(
            div,
            "--color",
            /*value*/
            ctx[0]
          );
        },
        m(target, anchor) {
          insert(target, div, anchor);
        },
        p(ctx2, [dirty]) {
          if (dirty & /*value*/
          1) {
            set_style(
              div,
              "--color",
              /*value*/
              ctx2[0]
            );
          }
        },
        i: noop,
        o: noop,
        d(detaching) {
          if (detaching)
            detach(div);
        }
      };
    }
    function instance$h($$self, $$props, $$invalidate) {
      let { value } = $$props;
      $$self.$$set = ($$props2) => {
        if ("value" in $$props2)
          $$invalidate(0, value = $$props2.value);
      };
      return [value];
    }
    class Color extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$h, create_fragment$i, safe_not_equal, { value: 0 });
      }
    }
    const Table_svelte_svelte_type_style_lang = "";
    function get_each_context$7(ctx, list, i2) {
      const child_ctx = ctx.slice();
      child_ctx[15] = list[i2];
      child_ctx[18] = i2;
      const constants_0 = (
        /*body*/
        child_ctx[0][
          /*idx*/
          child_ctx[18]
        ]
      );
      child_ctx[16] = constants_0;
      return child_ctx;
    }
    function get_each_context_1$1(ctx, list, i2) {
      const child_ctx = ctx.slice();
      child_ctx[19] = list[i2];
      return child_ctx;
    }
    function get_each_context_2$1(ctx, list, i2) {
      const child_ctx = ctx.slice();
      child_ctx[19] = list[i2];
      return child_ctx;
    }
    function create_each_block_2$1(ctx) {
      let sortableth;
      let current;
      sortableth = new SortableTh({
        props: {
          name: (
            /*key*/
            ctx[19].name
          ),
          sortable: (
            /*key*/
            ctx[19].sortable
          ),
          key: (
            /*key*/
            ctx[19].key
          ),
          changeDirection: (
            /*sort*/
            ctx[9]
          ),
          selectedKey: (
            /*sortKey*/
            ctx[7]
          )
        }
      });
      return {
        c() {
          create_component(sortableth.$$.fragment);
        },
        m(target, anchor) {
          mount_component(sortableth, target, anchor);
          current = true;
        },
        p(ctx2, dirty) {
          const sortableth_changes = {};
          if (dirty & /*head*/
          4)
            sortableth_changes.name = /*key*/
            ctx2[19].name;
          if (dirty & /*head*/
          4)
            sortableth_changes.sortable = /*key*/
            ctx2[19].sortable;
          if (dirty & /*head*/
          4)
            sortableth_changes.key = /*key*/
            ctx2[19].key;
          if (dirty & /*sortKey*/
          128)
            sortableth_changes.selectedKey = /*sortKey*/
            ctx2[7];
          sortableth.$set(sortableth_changes);
        },
        i(local) {
          if (current)
            return;
          transition_in(sortableth.$$.fragment, local);
          current = true;
        },
        o(local) {
          transition_out(sortableth.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          destroy_component(sortableth, detaching);
        }
      };
    }
    function create_if_block_10$1(ctx) {
      let th;
      return {
        c() {
          th = element("th");
          th.textContent = "삭제";
        },
        m(target, anchor) {
          insert(target, th, anchor);
        },
        d(detaching) {
          if (detaching)
            detach(th);
        }
      };
    }
    function create_else_block$3(ctx) {
      let each_1_anchor;
      let current;
      let each_value = { length: (
        /*body*/
        ctx[0].length
      ) };
      let each_blocks = [];
      for (let i2 = 0; i2 < each_value.length; i2 += 1) {
        each_blocks[i2] = create_each_block$7(get_each_context$7(ctx, each_value, i2));
      }
      const out = (i2) => transition_out(each_blocks[i2], 1, 1, () => {
        each_blocks[i2] = null;
      });
      return {
        c() {
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            each_blocks[i2].c();
          }
          each_1_anchor = empty();
        },
        m(target, anchor) {
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            if (each_blocks[i2]) {
              each_blocks[i2].m(target, anchor);
            }
          }
          insert(target, each_1_anchor, anchor);
          current = true;
        },
        p(ctx2, dirty) {
          if (dirty & /*selectedIdx, onClickData, body, deleteItem, idHead, options, head, undefined*/
          1327) {
            each_value = { length: (
              /*body*/
              ctx2[0].length
            ) };
            let i2;
            for (i2 = 0; i2 < each_value.length; i2 += 1) {
              const child_ctx = get_each_context$7(ctx2, each_value, i2);
              if (each_blocks[i2]) {
                each_blocks[i2].p(child_ctx, dirty);
                transition_in(each_blocks[i2], 1);
              } else {
                each_blocks[i2] = create_each_block$7(child_ctx);
                each_blocks[i2].c();
                transition_in(each_blocks[i2], 1);
                each_blocks[i2].m(each_1_anchor.parentNode, each_1_anchor);
              }
            }
            group_outros();
            for (i2 = each_value.length; i2 < each_blocks.length; i2 += 1) {
              out(i2);
            }
            check_outros();
          }
        },
        i(local) {
          if (current)
            return;
          for (let i2 = 0; i2 < each_value.length; i2 += 1) {
            transition_in(each_blocks[i2]);
          }
          current = true;
        },
        o(local) {
          each_blocks = each_blocks.filter(Boolean);
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            transition_out(each_blocks[i2]);
          }
          current = false;
        },
        d(detaching) {
          destroy_each(each_blocks, detaching);
          if (detaching)
            detach(each_1_anchor);
        }
      };
    }
    function create_if_block$6(ctx) {
      let t0;
      let t1;
      let tr;
      let td;
      let t2;
      let td_colspan_value;
      return {
        c() {
          t0 = text(
            /*body*/
            ctx[0]
          );
          t1 = space();
          tr = element("tr");
          td = element("td");
          t2 = text("데이터가 없습니다.");
          attr(td, "colspan", td_colspan_value = /*head*/
          ctx[2].length);
          set_style(td, "text-align", "center");
          set_style(td, "vertical-align", "middle");
          set_style(td, "height", "100px");
          attr(td, "class", "svelte-1e747dv");
        },
        m(target, anchor) {
          insert(target, t0, anchor);
          insert(target, t1, anchor);
          insert(target, tr, anchor);
          append(tr, td);
          append(td, t2);
        },
        p(ctx2, dirty) {
          if (dirty & /*body*/
          1)
            set_data(
              t0,
              /*body*/
              ctx2[0]
            );
          if (dirty & /*head*/
          4 && td_colspan_value !== (td_colspan_value = /*head*/
          ctx2[2].length)) {
            attr(td, "colspan", td_colspan_value);
          }
        },
        i: noop,
        o: noop,
        d(detaching) {
          if (detaching)
            detach(t0);
          if (detaching)
            detach(t1);
          if (detaching)
            detach(tr);
        }
      };
    }
    function create_else_block_1$1(ctx) {
      var _a;
      let t_value = (
        /*data*/
        ((_a = ctx[16][
          /*key*/
          ctx[19].key
        ]) != null ? _a : "") + ""
      );
      let t2;
      return {
        c() {
          t2 = text(t_value);
        },
        m(target, anchor) {
          insert(target, t2, anchor);
        },
        p(ctx2, dirty) {
          var _a2;
          if (dirty & /*body, head*/
          5 && t_value !== (t_value = /*data*/
          ((_a2 = ctx2[16][
            /*key*/
            ctx2[19].key
          ]) != null ? _a2 : "") + ""))
            set_data(t2, t_value);
        },
        i: noop,
        o: noop,
        d(detaching) {
          if (detaching)
            detach(t2);
        }
      };
    }
    function create_if_block_9$1(ctx) {
      let img;
      let img_src_value;
      return {
        c() {
          img = element("img");
          if (!src_url_equal(img.src, img_src_value = /*data*/
          ctx[16][
            /*key*/
            ctx[19].key
          ]))
            attr(img, "src", img_src_value);
          set_style(img, "width", "100px");
          set_style(img, "height", "100px");
          attr(img, "alt", "");
        },
        m(target, anchor) {
          insert(target, img, anchor);
        },
        p(ctx2, dirty) {
          if (dirty & /*body, head*/
          5 && !src_url_equal(img.src, img_src_value = /*data*/
          ctx2[16][
            /*key*/
            ctx2[19].key
          ])) {
            attr(img, "src", img_src_value);
          }
        },
        i: noop,
        o: noop,
        d(detaching) {
          if (detaching)
            detach(img);
        }
      };
    }
    function create_if_block_8$2(ctx) {
      let button;
      let current;
      button = new Button({ props: { text: (
        /*key*/
        ctx[19].name
      ) } });
      button.$on("click", function() {
        if (is_function(
          /*key*/
          ctx[19].onClick(
            /*data*/
            ctx[16]
          )
        ))
          ctx[19].onClick(
            /*data*/
            ctx[16]
          ).apply(this, arguments);
      });
      return {
        c() {
          create_component(button.$$.fragment);
        },
        m(target, anchor) {
          mount_component(button, target, anchor);
          current = true;
        },
        p(new_ctx, dirty) {
          ctx = new_ctx;
          const button_changes = {};
          if (dirty & /*head*/
          4)
            button_changes.text = /*key*/
            ctx[19].name;
          button.$set(button_changes);
        },
        i(local) {
          if (current)
            return;
          transition_in(button.$$.fragment, local);
          current = true;
        },
        o(local) {
          transition_out(button.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          destroy_component(button, detaching);
        }
      };
    }
    function create_if_block_7$2(ctx) {
      let html_tag;
      let raw_value = (
        /*key*/
        ctx[19].defaultHtml + ""
      );
      let html_anchor;
      return {
        c() {
          html_tag = new HtmlTag(false);
          html_anchor = empty();
          html_tag.a = html_anchor;
        },
        m(target, anchor) {
          html_tag.m(raw_value, target, anchor);
          insert(target, html_anchor, anchor);
        },
        p(ctx2, dirty) {
          if (dirty & /*head*/
          4 && raw_value !== (raw_value = /*key*/
          ctx2[19].defaultHtml + ""))
            html_tag.p(raw_value);
        },
        i: noop,
        o: noop,
        d(detaching) {
          if (detaching)
            detach(html_anchor);
          if (detaching)
            html_tag.d();
        }
      };
    }
    function create_if_block_6$2(ctx) {
      let color2;
      let current;
      color2 = new Color({
        props: {
          value: (
            /*data*/
            ctx[16][
              /*key*/
              ctx[19].key
            ]
          )
        }
      });
      return {
        c() {
          create_component(color2.$$.fragment);
        },
        m(target, anchor) {
          mount_component(color2, target, anchor);
          current = true;
        },
        p(ctx2, dirty) {
          const color_changes = {};
          if (dirty & /*body, head*/
          5)
            color_changes.value = /*data*/
            ctx2[16][
              /*key*/
              ctx2[19].key
            ];
          color2.$set(color_changes);
        },
        i(local) {
          if (current)
            return;
          transition_in(color2.$$.fragment, local);
          current = true;
        },
        o(local) {
          transition_out(color2.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          destroy_component(color2, detaching);
        }
      };
    }
    function create_if_block_5$2(ctx) {
      let t_value = (
        /*data*/
        ctx[16][
          /*key*/
          ctx[19].key
        ].split("T")[0] + ""
      );
      let t2;
      return {
        c() {
          t2 = text(t_value);
        },
        m(target, anchor) {
          insert(target, t2, anchor);
        },
        p(ctx2, dirty) {
          if (dirty & /*body, head*/
          5 && t_value !== (t_value = /*data*/
          ctx2[16][
            /*key*/
            ctx2[19].key
          ].split("T")[0] + ""))
            set_data(t2, t_value);
        },
        i: noop,
        o: noop,
        d(detaching) {
          if (detaching)
            detach(t2);
        }
      };
    }
    function create_if_block_4$2(ctx) {
      let t_value = (
        /*data*/
        ctx[16][
          /*key*/
          ctx[19].key
        ].join(", ") + ""
      );
      let t2;
      return {
        c() {
          t2 = text(t_value);
        },
        m(target, anchor) {
          insert(target, t2, anchor);
        },
        p(ctx2, dirty) {
          if (dirty & /*body, head*/
          5 && t_value !== (t_value = /*data*/
          ctx2[16][
            /*key*/
            ctx2[19].key
          ].join(", ") + ""))
            set_data(t2, t_value);
        },
        i: noop,
        o: noop,
        d(detaching) {
          if (detaching)
            detach(t2);
        }
      };
    }
    function create_if_block_3$2(ctx) {
      let status;
      let current;
      status = new Status({
        props: {
          status: (
            /*data*/
            ctx[16][
              /*key*/
              ctx[19].key
            ]
          )
        }
      });
      return {
        c() {
          create_component(status.$$.fragment);
        },
        m(target, anchor) {
          mount_component(status, target, anchor);
          current = true;
        },
        p(ctx2, dirty) {
          const status_changes = {};
          if (dirty & /*body, head*/
          5)
            status_changes.status = /*data*/
            ctx2[16][
              /*key*/
              ctx2[19].key
            ];
          status.$set(status_changes);
        },
        i(local) {
          if (current)
            return;
          transition_in(status.$$.fragment, local);
          current = true;
        },
        o(local) {
          transition_out(status.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          destroy_component(status, detaching);
        }
      };
    }
    function create_each_block_1$1(ctx) {
      let td;
      let span;
      let current_block_type_index;
      let if_block;
      let span_style_value;
      let current;
      const if_block_creators = [
        create_if_block_3$2,
        create_if_block_4$2,
        create_if_block_5$2,
        create_if_block_6$2,
        create_if_block_7$2,
        create_if_block_8$2,
        create_if_block_9$1,
        create_else_block_1$1
      ];
      const if_blocks = [];
      function select_block_type_1(ctx2, dirty) {
        if (
          /*key*/
          ctx2[19].type === "status"
        )
          return 0;
        if (
          /*key*/
          ctx2[19].type === "list"
        )
          return 1;
        if (
          /*key*/
          ctx2[19].type === "date"
        )
          return 2;
        if (
          /*key*/
          ctx2[19].type === "color"
        )
          return 3;
        if (
          /*key*/
          ctx2[19].defaultHtml !== void 0
        )
          return 4;
        if (
          /*key*/
          ctx2[19].type === "button"
        )
          return 5;
        if (
          /*key*/
          ctx2[19].type === "image"
        )
          return 6;
        return 7;
      }
      current_block_type_index = select_block_type_1(ctx);
      if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
      return {
        c() {
          td = element("td");
          span = element("span");
          if_block.c();
          attr(span, "style", span_style_value = /*key*/
          ctx[19].selectedOnClick !== void 0 ? "cursor: pointer" : "");
          attr(td, "class", "svelte-1e747dv");
        },
        m(target, anchor) {
          insert(target, td, anchor);
          append(td, span);
          if_blocks[current_block_type_index].m(span, null);
          current = true;
        },
        p(ctx2, dirty) {
          let previous_block_index = current_block_type_index;
          current_block_type_index = select_block_type_1(ctx2);
          if (current_block_type_index === previous_block_index) {
            if_blocks[current_block_type_index].p(ctx2, dirty);
          } else {
            group_outros();
            transition_out(if_blocks[previous_block_index], 1, 1, () => {
              if_blocks[previous_block_index] = null;
            });
            check_outros();
            if_block = if_blocks[current_block_type_index];
            if (!if_block) {
              if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
              if_block.c();
            } else {
              if_block.p(ctx2, dirty);
            }
            transition_in(if_block, 1);
            if_block.m(span, null);
          }
          if (!current || dirty & /*head*/
          4 && span_style_value !== (span_style_value = /*key*/
          ctx2[19].selectedOnClick !== void 0 ? "cursor: pointer" : "")) {
            attr(span, "style", span_style_value);
          }
        },
        i(local) {
          if (current)
            return;
          transition_in(if_block);
          current = true;
        },
        o(local) {
          transition_out(if_block);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(td);
          if_blocks[current_block_type_index].d();
        }
      };
    }
    function create_if_block_1$2(ctx) {
      let td;
      let show_if = (
        /*options*/
        ctx[5].deletableHandler(
          /*data*/
          ctx[16]
        )
      );
      let current;
      let if_block = show_if && create_if_block_2$2(ctx);
      return {
        c() {
          td = element("td");
          if (if_block)
            if_block.c();
          attr(td, "onclick", "event.stopPropagation()");
          attr(td, "class", "svelte-1e747dv");
        },
        m(target, anchor) {
          insert(target, td, anchor);
          if (if_block)
            if_block.m(td, null);
          current = true;
        },
        p(ctx2, dirty) {
          if (dirty & /*options, body*/
          33)
            show_if = /*options*/
            ctx2[5].deletableHandler(
              /*data*/
              ctx2[16]
            );
          if (show_if) {
            if (if_block) {
              if_block.p(ctx2, dirty);
              if (dirty & /*options, body*/
              33) {
                transition_in(if_block, 1);
              }
            } else {
              if_block = create_if_block_2$2(ctx2);
              if_block.c();
              transition_in(if_block, 1);
              if_block.m(td, null);
            }
          } else if (if_block) {
            group_outros();
            transition_out(if_block, 1, 1, () => {
              if_block = null;
            });
            check_outros();
          }
        },
        i(local) {
          if (current)
            return;
          transition_in(if_block);
          current = true;
        },
        o(local) {
          transition_out(if_block);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(td);
          if (if_block)
            if_block.d();
        }
      };
    }
    function create_if_block_2$2(ctx) {
      let deletemodal;
      let current;
      deletemodal = new DeleteModal({
        props: {
          deleteHandler: (
            /*deleteItem*/
            ctx[10]
          ),
          item: (
            /*data*/
            ctx[16]
          ),
          name: (
            /*data*/
            ctx[16][
              /*idHead*/
              ctx[3]
            ]
          )
        }
      });
      return {
        c() {
          create_component(deletemodal.$$.fragment);
        },
        m(target, anchor) {
          mount_component(deletemodal, target, anchor);
          current = true;
        },
        p(ctx2, dirty) {
          const deletemodal_changes = {};
          if (dirty & /*body*/
          1)
            deletemodal_changes.item = /*data*/
            ctx2[16];
          if (dirty & /*body, idHead*/
          9)
            deletemodal_changes.name = /*data*/
            ctx2[16][
              /*idHead*/
              ctx2[3]
            ];
          deletemodal.$set(deletemodal_changes);
        },
        i(local) {
          if (current)
            return;
          transition_in(deletemodal.$$.fragment, local);
          current = true;
        },
        o(local) {
          transition_out(deletemodal.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          destroy_component(deletemodal, detaching);
        }
      };
    }
    function create_each_block$7(ctx) {
      let tr;
      let t0;
      let t1;
      let current;
      let mounted;
      let dispose;
      let each_value_1 = (
        /*head*/
        ctx[2]
      );
      let each_blocks = [];
      for (let i2 = 0; i2 < each_value_1.length; i2 += 1) {
        each_blocks[i2] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i2));
      }
      const out = (i2) => transition_out(each_blocks[i2], 1, 1, () => {
        each_blocks[i2] = null;
      });
      let if_block = (
        /*options*/
        ctx[5].deletable && create_if_block_1$2(ctx)
      );
      function click_handler2(...args) {
        return (
          /*click_handler*/
          ctx[13](
            /*idx*/
            ctx[18],
            /*data*/
            ctx[16],
            ...args
          )
        );
      }
      return {
        c() {
          tr = element("tr");
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            each_blocks[i2].c();
          }
          t0 = space();
          if (if_block)
            if_block.c();
          t1 = space();
          set_style(tr, "cursor", "pointer");
          toggle_class(
            tr,
            "table-active",
            /*selectedIdx*/
            ctx[1] === /*idx*/
            ctx[18]
          );
        },
        m(target, anchor) {
          insert(target, tr, anchor);
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            if (each_blocks[i2]) {
              each_blocks[i2].m(tr, null);
            }
          }
          append(tr, t0);
          if (if_block)
            if_block.m(tr, null);
          append(tr, t1);
          current = true;
          if (!mounted) {
            dispose = listen(tr, "click", click_handler2);
            mounted = true;
          }
        },
        p(new_ctx, dirty) {
          ctx = new_ctx;
          if (dirty & /*head, undefined, body*/
          5) {
            each_value_1 = /*head*/
            ctx[2];
            let i2;
            for (i2 = 0; i2 < each_value_1.length; i2 += 1) {
              const child_ctx = get_each_context_1$1(ctx, each_value_1, i2);
              if (each_blocks[i2]) {
                each_blocks[i2].p(child_ctx, dirty);
                transition_in(each_blocks[i2], 1);
              } else {
                each_blocks[i2] = create_each_block_1$1(child_ctx);
                each_blocks[i2].c();
                transition_in(each_blocks[i2], 1);
                each_blocks[i2].m(tr, t0);
              }
            }
            group_outros();
            for (i2 = each_value_1.length; i2 < each_blocks.length; i2 += 1) {
              out(i2);
            }
            check_outros();
          }
          if (
            /*options*/
            ctx[5].deletable
          ) {
            if (if_block) {
              if_block.p(ctx, dirty);
              if (dirty & /*options*/
              32) {
                transition_in(if_block, 1);
              }
            } else {
              if_block = create_if_block_1$2(ctx);
              if_block.c();
              transition_in(if_block, 1);
              if_block.m(tr, t1);
            }
          } else if (if_block) {
            group_outros();
            transition_out(if_block, 1, 1, () => {
              if_block = null;
            });
            check_outros();
          }
          if (!current || dirty & /*selectedIdx*/
          2) {
            toggle_class(
              tr,
              "table-active",
              /*selectedIdx*/
              ctx[1] === /*idx*/
              ctx[18]
            );
          }
        },
        i(local) {
          if (current)
            return;
          for (let i2 = 0; i2 < each_value_1.length; i2 += 1) {
            transition_in(each_blocks[i2]);
          }
          transition_in(if_block);
          current = true;
        },
        o(local) {
          each_blocks = each_blocks.filter(Boolean);
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            transition_out(each_blocks[i2]);
          }
          transition_out(if_block);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(tr);
          destroy_each(each_blocks, detaching);
          if (if_block)
            if_block.d();
          mounted = false;
          dispose();
        }
      };
    }
    function create_fragment$h(ctx) {
      let div;
      let table;
      let thead;
      let tr;
      let t0;
      let t1;
      let tbody;
      let current_block_type_index;
      let if_block1;
      let div_class_value;
      let current;
      let each_value_2 = (
        /*head*/
        ctx[2]
      );
      let each_blocks = [];
      for (let i2 = 0; i2 < each_value_2.length; i2 += 1) {
        each_blocks[i2] = create_each_block_2$1(get_each_context_2$1(ctx, each_value_2, i2));
      }
      const out = (i2) => transition_out(each_blocks[i2], 1, 1, () => {
        each_blocks[i2] = null;
      });
      let if_block0 = (
        /*options*/
        ctx[5].deletable && create_if_block_10$1()
      );
      const if_block_creators = [create_if_block$6, create_else_block$3];
      const if_blocks = [];
      function select_block_type(ctx2, dirty) {
        if (
          /*body*/
          ctx2[0].length === 0
        )
          return 0;
        return 1;
      }
      current_block_type_index = select_block_type(ctx);
      if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
      return {
        c() {
          div = element("div");
          table = element("table");
          thead = element("thead");
          tr = element("tr");
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            each_blocks[i2].c();
          }
          t0 = space();
          if (if_block0)
            if_block0.c();
          t1 = space();
          tbody = element("tbody");
          if_block1.c();
          set_style(tr, "background", "rgb(52, 48, 48)");
          set_style(tr, "color", "white");
          attr(table, "class", "table w-90 mx-auto mt-3 table-hover");
          attr(div, "class", div_class_value = /*tableHeight*/
          ctx[4] + " table-responsive");
        },
        m(target, anchor) {
          insert(target, div, anchor);
          append(div, table);
          append(table, thead);
          append(thead, tr);
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            if (each_blocks[i2]) {
              each_blocks[i2].m(tr, null);
            }
          }
          append(tr, t0);
          if (if_block0)
            if_block0.m(tr, null);
          append(table, t1);
          append(table, tbody);
          if_blocks[current_block_type_index].m(tbody, null);
          ctx[14](div);
          current = true;
        },
        p(ctx2, [dirty]) {
          if (dirty & /*head, sort, sortKey*/
          644) {
            each_value_2 = /*head*/
            ctx2[2];
            let i2;
            for (i2 = 0; i2 < each_value_2.length; i2 += 1) {
              const child_ctx = get_each_context_2$1(ctx2, each_value_2, i2);
              if (each_blocks[i2]) {
                each_blocks[i2].p(child_ctx, dirty);
                transition_in(each_blocks[i2], 1);
              } else {
                each_blocks[i2] = create_each_block_2$1(child_ctx);
                each_blocks[i2].c();
                transition_in(each_blocks[i2], 1);
                each_blocks[i2].m(tr, t0);
              }
            }
            group_outros();
            for (i2 = each_value_2.length; i2 < each_blocks.length; i2 += 1) {
              out(i2);
            }
            check_outros();
          }
          if (
            /*options*/
            ctx2[5].deletable
          ) {
            if (if_block0)
              ;
            else {
              if_block0 = create_if_block_10$1();
              if_block0.c();
              if_block0.m(tr, null);
            }
          } else if (if_block0) {
            if_block0.d(1);
            if_block0 = null;
          }
          let previous_block_index = current_block_type_index;
          current_block_type_index = select_block_type(ctx2);
          if (current_block_type_index === previous_block_index) {
            if_blocks[current_block_type_index].p(ctx2, dirty);
          } else {
            group_outros();
            transition_out(if_blocks[previous_block_index], 1, 1, () => {
              if_blocks[previous_block_index] = null;
            });
            check_outros();
            if_block1 = if_blocks[current_block_type_index];
            if (!if_block1) {
              if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
              if_block1.c();
            } else {
              if_block1.p(ctx2, dirty);
            }
            transition_in(if_block1, 1);
            if_block1.m(tbody, null);
          }
          if (!current || dirty & /*tableHeight*/
          16 && div_class_value !== (div_class_value = /*tableHeight*/
          ctx2[4] + " table-responsive")) {
            attr(div, "class", div_class_value);
          }
        },
        i(local) {
          if (current)
            return;
          for (let i2 = 0; i2 < each_value_2.length; i2 += 1) {
            transition_in(each_blocks[i2]);
          }
          transition_in(if_block1);
          current = true;
        },
        o(local) {
          each_blocks = each_blocks.filter(Boolean);
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            transition_out(each_blocks[i2]);
          }
          transition_out(if_block1);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(div);
          destroy_each(each_blocks, detaching);
          if (if_block0)
            if_block0.d();
          if_blocks[current_block_type_index].d();
          ctx[14](null);
        }
      };
    }
    function instance$g($$self, $$props, $$invalidate) {
      let { head = [] } = $$props;
      let { body = [] } = $$props;
      let { idHead = "id" } = $$props;
      let { tableHeight = "h-100" } = $$props;
      let { refreshHandler = () => {
      } } = $$props;
      let { clickHandler = () => {
      } } = $$props;
      let { options = {
        deletable: false,
        deletableHandler: (item) => {
          return !!item;
        },
        deleteHandler: () => {
        }
      } } = $$props;
      let element2;
      let sortKey2 = "";
      let { selectedIdx } = $$props;
      function onClickData(idx, data) {
        clickHandler(idx, data);
        $$invalidate(1, selectedIdx = idx);
      }
      function sort(key, direction, sortable) {
        if (!sortable)
          return;
        let desc = direction === "desc";
        $$invalidate(7, sortKey2 = key);
        $$invalidate(0, body = body.sort((a2, b2) => {
          if (a2[key] < b2[key]) {
            return desc ? 1 : -1;
          }
          if (a2[key] > b2[key]) {
            return desc ? -1 : 1;
          }
          return 0;
        }));
      }
      function deleteItem(item) {
        return __async(this, null, function* () {
          if (options.deletableHandler(item)) {
            yield options.deleteHandler(item);
            yield refreshHandler();
          }
        });
      }
      const click_handler2 = (idx, data, e2) => {
        onClickData(idx, data);
      };
      function div_binding($$value) {
        binding_callbacks[$$value ? "unshift" : "push"](() => {
          element2 = $$value;
          $$invalidate(6, element2);
        });
      }
      $$self.$$set = ($$props2) => {
        if ("head" in $$props2)
          $$invalidate(2, head = $$props2.head);
        if ("body" in $$props2)
          $$invalidate(0, body = $$props2.body);
        if ("idHead" in $$props2)
          $$invalidate(3, idHead = $$props2.idHead);
        if ("tableHeight" in $$props2)
          $$invalidate(4, tableHeight = $$props2.tableHeight);
        if ("refreshHandler" in $$props2)
          $$invalidate(11, refreshHandler = $$props2.refreshHandler);
        if ("clickHandler" in $$props2)
          $$invalidate(12, clickHandler = $$props2.clickHandler);
        if ("options" in $$props2)
          $$invalidate(5, options = $$props2.options);
        if ("selectedIdx" in $$props2)
          $$invalidate(1, selectedIdx = $$props2.selectedIdx);
      };
      return [
        body,
        selectedIdx,
        head,
        idHead,
        tableHeight,
        options,
        element2,
        sortKey2,
        onClickData,
        sort,
        deleteItem,
        refreshHandler,
        clickHandler,
        click_handler2,
        div_binding
      ];
    }
    class Table extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$g, create_fragment$h, safe_not_equal, {
          head: 2,
          body: 0,
          idHead: 3,
          tableHeight: 4,
          refreshHandler: 11,
          clickHandler: 12,
          options: 5,
          selectedIdx: 1
        });
      }
    }
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    const freeGlobal$1 = freeGlobal;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal$1 || freeSelf || Function("return this")();
    const root$1 = root;
    var Symbol$1 = root$1.Symbol;
    const Symbol$2 = Symbol$1;
    var objectProto$6 = Object.prototype;
    var hasOwnProperty$4 = objectProto$6.hasOwnProperty;
    var nativeObjectToString$1 = objectProto$6.toString;
    var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
    function getRawTag(value) {
      var isOwn = hasOwnProperty$4.call(value, symToStringTag$1), tag = value[symToStringTag$1];
      try {
        value[symToStringTag$1] = void 0;
        var unmasked = true;
      } catch (e2) {
      }
      var result = nativeObjectToString$1.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag$1] = tag;
        } else {
          delete value[symToStringTag$1];
        }
      }
      return result;
    }
    var objectProto$5 = Object.prototype;
    var nativeObjectToString = objectProto$5.toString;
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
    var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    var symbolTag = "[object Symbol]";
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
    }
    function arrayMap(array, iteratee) {
      var index = -1, length = array == null ? 0 : array.length, result = Array(length);
      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }
    var isArray$1 = Array.isArray;
    const isArray$2 = isArray$1;
    var INFINITY = 1 / 0;
    var symbolProto = Symbol$2 ? Symbol$2.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
    function baseToString(value) {
      if (typeof value == "string") {
        return value;
      }
      if (isArray$2(value)) {
        return arrayMap(value, baseToString) + "";
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : "";
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    var reWhitespace = /\s/;
    function trimmedEndIndex(string) {
      var index = string.length;
      while (index-- && reWhitespace.test(string.charAt(index))) {
      }
      return index;
    }
    var reTrimStart = /^\s+/;
    function baseTrim(string) {
      return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
    }
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == "object" || type == "function");
    }
    var asyncTag = "[object AsyncFunction]", funcTag$1 = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
    }
    var coreJsData = root$1["__core-js_shared__"];
    const coreJsData$1 = coreJsData;
    var maskSrcKey = function() {
      var uid = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    }();
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    var funcProto$1 = Function.prototype;
    var funcToString$1 = funcProto$1.toString;
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString$1.call(func);
        } catch (e2) {
        }
        try {
          return func + "";
        } catch (e2) {
        }
      }
      return "";
    }
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var funcProto = Function.prototype, objectProto$4 = Object.prototype;
    var funcToString = funcProto.toString;
    var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
    var reIsNative = RegExp(
      "^" + funcToString.call(hasOwnProperty$3).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    );
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    var WeakMap = getNative(root$1, "WeakMap");
    const WeakMap$1 = WeakMap;
    function baseFindIndex(array, predicate, fromIndex, fromRight) {
      var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
      while (fromRight ? index-- : ++index < length) {
        if (predicate(array[index], index, array)) {
          return index;
        }
      }
      return -1;
    }
    function baseIsNaN(value) {
      return value !== value;
    }
    function strictIndexOf(array, value, fromIndex) {
      var index = fromIndex - 1, length = array.length;
      while (++index < length) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }
    function baseIndexOf(array, value, fromIndex) {
      return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
    }
    var MAX_SAFE_INTEGER = 9007199254740991;
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    var objectProto$3 = Object.prototype;
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto2 = typeof Ctor == "function" && Ctor.prototype || objectProto$3;
      return value === proto2;
    }
    var argsTag$1 = "[object Arguments]";
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag$1;
    }
    var objectProto$2 = Object.prototype;
    var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
    var propertyIsEnumerable = objectProto$2.propertyIsEnumerable;
    var isArguments = baseIsArguments(function() {
      return arguments;
    }()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty$2.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
    };
    const isArguments$1 = isArguments;
    function stubFalse() {
      return false;
    }
    var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
    var Buffer2 = moduleExports$1 ? root$1.Buffer : void 0;
    var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
    var isBuffer = nativeIsBuffer || stubFalse;
    const isBuffer$1 = isBuffer;
    var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", mapTag$2 = "[object Map]", numberTag = "[object Number]", objectTag$1 = "[object Object]", regexpTag = "[object RegExp]", setTag$2 = "[object Set]", stringTag = "[object String]", weakMapTag$1 = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag$1] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag$2] = typedArrayTags[numberTag] = typedArrayTags[objectTag$1] = typedArrayTags[regexpTag] = typedArrayTags[setTag$2] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag$1] = false;
    function baseIsTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal$1.process;
    var nodeUtil = function() {
      try {
        var types = freeModule && freeModule.require && freeModule.require("util").types;
        if (types) {
          return types;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e2) {
      }
    }();
    const nodeUtil$1 = nodeUtil;
    var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray;
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    const isTypedArray$1 = isTypedArray;
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    var nativeKeys = overArg(Object.keys, Object);
    const nativeKeys$1 = nativeKeys;
    var objectProto$1 = Object.prototype;
    var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys$1(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty$1.call(object, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    var Map$1 = getNative(root$1, "Map");
    const Map$2 = Map$1;
    function toString(value) {
      return value == null ? "" : baseToString(value);
    }
    function baseSlice(array, start, end) {
      var index = -1, length = array.length;
      if (start < 0) {
        start = -start > length ? 0 : length + start;
      }
      end = end > length ? length : end;
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : end - start >>> 0;
      start >>>= 0;
      var result = Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    }
    function castSlice(array, start, end) {
      var length = array.length;
      end = end === void 0 ? length : end;
      return !start && end >= length ? array : baseSlice(array, start, end);
    }
    var rsAstralRange$1 = "\\ud800-\\udfff", rsComboMarksRange$1 = "\\u0300-\\u036f", reComboHalfMarksRange$1 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$1 = "\\u20d0-\\u20ff", rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1, rsVarRange$1 = "\\ufe0e\\ufe0f";
    var rsZWJ$1 = "\\u200d";
    var reHasUnicode = RegExp("[" + rsZWJ$1 + rsAstralRange$1 + rsComboRange$1 + rsVarRange$1 + "]");
    function hasUnicode(string) {
      return reHasUnicode.test(string);
    }
    function asciiToArray(string) {
      return string.split("");
    }
    var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsVarRange = "\\ufe0e\\ufe0f";
    var rsAstral = "[" + rsAstralRange + "]", rsCombo = "[" + rsComboRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsZWJ = "\\u200d";
    var reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
    var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
    function unicodeToArray(string) {
      return string.match(reUnicode) || [];
    }
    function stringToArray(string) {
      return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
    }
    var DataView$1 = getNative(root$1, "DataView");
    const DataView$2 = DataView$1;
    var Promise$1 = getNative(root$1, "Promise");
    const Promise$2 = Promise$1;
    var Set$1 = getNative(root$1, "Set");
    const Set$2 = Set$1;
    var mapTag$1 = "[object Map]", objectTag = "[object Object]", promiseTag = "[object Promise]", setTag$1 = "[object Set]", weakMapTag = "[object WeakMap]";
    var dataViewTag = "[object DataView]";
    var dataViewCtorString = toSource(DataView$2), mapCtorString = toSource(Map$2), promiseCtorString = toSource(Promise$2), setCtorString = toSource(Set$2), weakMapCtorString = toSource(WeakMap$1);
    var getTag = baseGetTag;
    if (DataView$2 && getTag(new DataView$2(new ArrayBuffer(1))) != dataViewTag || Map$2 && getTag(new Map$2()) != mapTag$1 || Promise$2 && getTag(Promise$2.resolve()) != promiseTag || Set$2 && getTag(new Set$2()) != setTag$1 || WeakMap$1 && getTag(new WeakMap$1()) != weakMapTag) {
      getTag = function(value) {
        var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag;
            case mapCtorString:
              return mapTag$1;
            case promiseCtorString:
              return promiseTag;
            case setCtorString:
              return setTag$1;
            case weakMapCtorString:
              return weakMapTag;
          }
        }
        return result;
      };
    }
    const getTag$1 = getTag;
    var mapTag = "[object Map]", setTag = "[object Set]";
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function isEmpty(value) {
      if (value == null) {
        return true;
      }
      if (isArrayLike(value) && (isArray$2(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer$1(value) || isTypedArray$1(value) || isArguments$1(value))) {
        return !value.length;
      }
      var tag = getTag$1(value);
      if (tag == mapTag || tag == setTag) {
        return !value.size;
      }
      if (isPrototype(value)) {
        return !baseKeys(value).length;
      }
      for (var key in value) {
        if (hasOwnProperty.call(value, key)) {
          return false;
        }
      }
      return true;
    }
    function charsEndIndex(strSymbols, chrSymbols) {
      var index = strSymbols.length;
      while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
      }
      return index;
    }
    function charsStartIndex(strSymbols, chrSymbols) {
      var index = -1, length = strSymbols.length;
      while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
      }
      return index;
    }
    function trim(string, chars, guard) {
      string = toString(string);
      if (string && (guard || chars === void 0)) {
        return baseTrim(string);
      }
      if (!string || !(chars = baseToString(chars))) {
        return string;
      }
      var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
      return castSlice(strSymbols, start, end).join("");
    }
    function create_fragment$g(ctx) {
      let div;
      let textarea;
      let textarea_value_value;
      let t0;
      let label;
      let t1;
      let mounted;
      let dispose;
      return {
        c() {
          div = element("div");
          textarea = element("textarea");
          t0 = space();
          label = element("label");
          t1 = text(
            /*id*/
            ctx[1]
          );
          attr(textarea, "class", "form-control");
          attr(
            textarea,
            "placeholder",
            /*placeholder*/
            ctx[4]
          );
          attr(
            textarea,
            "id",
            /*id*/
            ctx[1]
          );
          attr(
            textarea,
            "type",
            /*type*/
            ctx[2]
          );
          attr(
            textarea,
            "style",
            /*style*/
            ctx[3]
          );
          textarea.value = textarea_value_value = /*isJson*/
          ctx[7] ? JSON.stringify(
            /*val*/
            ctx[5],
            void 0,
            4
          ) : (
            /*val*/
            ctx[5]
          );
          attr(
            label,
            "for",
            /*id*/
            ctx[1]
          );
          attr(div, "class", "form-floating");
        },
        m(target, anchor) {
          insert(target, div, anchor);
          append(div, textarea);
          ctx[8](textarea);
          append(div, t0);
          append(div, label);
          append(label, t1);
          if (!mounted) {
            dispose = listen(
              textarea,
              "change",
              /*change_handler*/
              ctx[9]
            );
            mounted = true;
          }
        },
        p(ctx2, [dirty]) {
          if (dirty & /*placeholder*/
          16) {
            attr(
              textarea,
              "placeholder",
              /*placeholder*/
              ctx2[4]
            );
          }
          if (dirty & /*id*/
          2) {
            attr(
              textarea,
              "id",
              /*id*/
              ctx2[1]
            );
          }
          if (dirty & /*type*/
          4) {
            attr(
              textarea,
              "type",
              /*type*/
              ctx2[2]
            );
          }
          if (dirty & /*style*/
          8) {
            attr(
              textarea,
              "style",
              /*style*/
              ctx2[3]
            );
          }
          if (dirty & /*val*/
          32 && textarea_value_value !== (textarea_value_value = /*isJson*/
          ctx2[7] ? JSON.stringify(
            /*val*/
            ctx2[5],
            void 0,
            4
          ) : (
            /*val*/
            ctx2[5]
          ))) {
            textarea.value = textarea_value_value;
          }
          if (dirty & /*id*/
          2)
            set_data(
              t1,
              /*id*/
              ctx2[1]
            );
          if (dirty & /*id*/
          2) {
            attr(
              label,
              "for",
              /*id*/
              ctx2[1]
            );
          }
        },
        i: noop,
        o: noop,
        d(detaching) {
          if (detaching)
            detach(div);
          ctx[8](null);
          mounted = false;
          dispose();
        }
      };
    }
    function instance$f($$self, $$props, $$invalidate) {
      let { id = "" } = $$props;
      let { value = "" } = $$props;
      let { type = "textarea" } = $$props;
      let { style = "height: 100px" } = $$props;
      let { placeholder = `Leave a ${id} here` } = $$props;
      let val = value;
      let element2;
      const isJson = type === "json";
      if (isJson && (value === "" || value === void 0 || value === null)) {
        val = {};
        value = val;
      }
      afterUpdate(() => {
        if (element2) {
          element2.scrollHeight > 100 && $$invalidate(6, element2.style.height = element2.scrollHeight + "px", element2);
        }
      });
      function textarea_binding($$value) {
        binding_callbacks[$$value ? "unshift" : "push"](() => {
          element2 = $$value;
          $$invalidate(6, element2);
        });
      }
      const change_handler = (e2) => {
        let currentValue = e2.currentTarget.value.trim();
        let newValue = currentValue;
        if (isEmpty(currentValue) && isJson) {
          newValue = "{}";
        }
        $$invalidate(0, value = isJson ? JSON.parse(newValue) : newValue);
      };
      $$self.$$set = ($$props2) => {
        if ("id" in $$props2)
          $$invalidate(1, id = $$props2.id);
        if ("value" in $$props2)
          $$invalidate(0, value = $$props2.value);
        if ("type" in $$props2)
          $$invalidate(2, type = $$props2.type);
        if ("style" in $$props2)
          $$invalidate(3, style = $$props2.style);
        if ("placeholder" in $$props2)
          $$invalidate(4, placeholder = $$props2.placeholder);
      };
      $$self.$$.update = () => {
        if ($$self.$$.dirty & /*value*/
        1) {
          if (value) {
            console.log(value);
          }
        }
      };
      return [
        value,
        id,
        type,
        style,
        placeholder,
        val,
        element2,
        isJson,
        textarea_binding,
        change_handler
      ];
    }
    class Textarea extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$f, create_fragment$g, safe_not_equal, {
          id: 1,
          value: 0,
          type: 2,
          style: 3,
          placeholder: 4
        });
      }
    }
    function create_fragment$f(ctx) {
      let div2;
      let div1;
      let div0;
      let t0;
      let t1;
      let button;
      let mounted;
      let dispose;
      return {
        c() {
          div2 = element("div");
          div1 = element("div");
          div0 = element("div");
          t0 = text(
            /*content*/
            ctx[1]
          );
          t1 = space();
          button = element("button");
          attr(div0, "class", "toast-body");
          attr(button, "type", "button");
          attr(button, "class", "btn-close btn-close-white me-2 m-auto");
          attr(button, "data-bs-dismiss", "toast");
          attr(button, "aria-label", "Close");
          attr(div1, "class", "d-flex");
          attr(div2, "class", "toast show align-items-center text-white border-0");
          attr(div2, "role", "alert");
          attr(div2, "aria-live", "assertive");
          attr(div2, "aria-atomic", "true");
        },
        m(target, anchor) {
          insert(target, div2, anchor);
          append(div2, div1);
          append(div1, div0);
          append(div0, t0);
          append(div1, t1);
          append(div1, button);
          if (!mounted) {
            dispose = listen(
              button,
              "click",
              /*click_handler*/
              ctx[2]
            );
            mounted = true;
          }
        },
        p(ctx2, [dirty]) {
          if (dirty & /*content*/
          2)
            set_data(
              t0,
              /*content*/
              ctx2[1]
            );
        },
        i: noop,
        o: noop,
        d(detaching) {
          if (detaching)
            detach(div2);
          mounted = false;
          dispose();
        }
      };
    }
    function instance$e($$self, $$props, $$invalidate) {
      let { index } = $$props;
      let { content } = $$props;
      const click_handler2 = () => toast.pop(index);
      $$self.$$set = ($$props2) => {
        if ("index" in $$props2)
          $$invalidate(0, index = $$props2.index);
        if ("content" in $$props2)
          $$invalidate(1, content = $$props2.content);
      };
      return [index, content, click_handler2];
    }
    class Toast extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$e, create_fragment$f, safe_not_equal, { index: 0, content: 1 });
      }
    }
    const ToolTip_svelte_svelte_type_style_lang = "";
    function getDefaultExportFromCjs(x2) {
      return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
    }
    var g = typeof globalThis !== "undefined" && globalThis || typeof self !== "undefined" && self || // eslint-disable-next-line no-undef
    typeof global !== "undefined" && global || {};
    var support = {
      searchParams: "URLSearchParams" in g,
      iterable: "Symbol" in g && "iterator" in Symbol,
      blob: "FileReader" in g && "Blob" in g && function() {
        try {
          new Blob();
          return true;
        } catch (e2) {
          return false;
        }
      }(),
      formData: "FormData" in g,
      arrayBuffer: "ArrayBuffer" in g
    };
    function isDataView(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj);
    }
    if (support.arrayBuffer) {
      var viewClasses = [
        "[object Int8Array]",
        "[object Uint8Array]",
        "[object Uint8ClampedArray]",
        "[object Int16Array]",
        "[object Uint16Array]",
        "[object Int32Array]",
        "[object Uint32Array]",
        "[object Float32Array]",
        "[object Float64Array]"
      ];
      var isArrayBufferView = ArrayBuffer.isView || function(obj) {
        return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
      };
    }
    function normalizeName(name) {
      if (typeof name !== "string") {
        name = String(name);
      }
      if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === "") {
        throw new TypeError('Invalid character in header field name: "' + name + '"');
      }
      return name.toLowerCase();
    }
    function normalizeValue(value) {
      if (typeof value !== "string") {
        value = String(value);
      }
      return value;
    }
    function iteratorFor(items) {
      var iterator = {
        next: function() {
          var value = items.shift();
          return { done: value === void 0, value };
        }
      };
      if (support.iterable) {
        iterator[Symbol.iterator] = function() {
          return iterator;
        };
      }
      return iterator;
    }
    function Headers(headers) {
      this.map = {};
      if (headers instanceof Headers) {
        headers.forEach(function(value, name) {
          this.append(name, value);
        }, this);
      } else if (Array.isArray(headers)) {
        headers.forEach(function(header) {
          if (header.length != 2) {
            throw new TypeError("Headers constructor: expected name/value pair to be length 2, found" + header.length);
          }
          this.append(header[0], header[1]);
        }, this);
      } else if (headers) {
        Object.getOwnPropertyNames(headers).forEach(function(name) {
          this.append(name, headers[name]);
        }, this);
      }
    }
    Headers.prototype.append = function(name, value) {
      name = normalizeName(name);
      value = normalizeValue(value);
      var oldValue = this.map[name];
      this.map[name] = oldValue ? oldValue + ", " + value : value;
    };
    Headers.prototype["delete"] = function(name) {
      delete this.map[normalizeName(name)];
    };
    Headers.prototype.get = function(name) {
      name = normalizeName(name);
      return this.has(name) ? this.map[name] : null;
    };
    Headers.prototype.has = function(name) {
      return this.map.hasOwnProperty(normalizeName(name));
    };
    Headers.prototype.set = function(name, value) {
      this.map[normalizeName(name)] = normalizeValue(value);
    };
    Headers.prototype.forEach = function(callback, thisArg) {
      for (var name in this.map) {
        if (this.map.hasOwnProperty(name)) {
          callback.call(thisArg, this.map[name], name, this);
        }
      }
    };
    Headers.prototype.keys = function() {
      var items = [];
      this.forEach(function(value, name) {
        items.push(name);
      });
      return iteratorFor(items);
    };
    Headers.prototype.values = function() {
      var items = [];
      this.forEach(function(value) {
        items.push(value);
      });
      return iteratorFor(items);
    };
    Headers.prototype.entries = function() {
      var items = [];
      this.forEach(function(value, name) {
        items.push([name, value]);
      });
      return iteratorFor(items);
    };
    if (support.iterable) {
      Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
    }
    function consumed(body) {
      if (body._noBody)
        return;
      if (body.bodyUsed) {
        return Promise.reject(new TypeError("Already read"));
      }
      body.bodyUsed = true;
    }
    function fileReaderReady(reader) {
      return new Promise(function(resolve, reject) {
        reader.onload = function() {
          resolve(reader.result);
        };
        reader.onerror = function() {
          reject(reader.error);
        };
      });
    }
    function readBlobAsArrayBuffer(blob) {
      var reader = new FileReader();
      var promise = fileReaderReady(reader);
      reader.readAsArrayBuffer(blob);
      return promise;
    }
    function readBlobAsText(blob) {
      var reader = new FileReader();
      var promise = fileReaderReady(reader);
      var match = /charset=([A-Za-z0-9_-]+)/.exec(blob.type);
      var encoding = match ? match[1] : "utf-8";
      reader.readAsText(blob, encoding);
      return promise;
    }
    function readArrayBufferAsText(buf) {
      var view = new Uint8Array(buf);
      var chars = new Array(view.length);
      for (var i2 = 0; i2 < view.length; i2++) {
        chars[i2] = String.fromCharCode(view[i2]);
      }
      return chars.join("");
    }
    function bufferClone(buf) {
      if (buf.slice) {
        return buf.slice(0);
      } else {
        var view = new Uint8Array(buf.byteLength);
        view.set(new Uint8Array(buf));
        return view.buffer;
      }
    }
    function Body() {
      this.bodyUsed = false;
      this._initBody = function(body) {
        this.bodyUsed = this.bodyUsed;
        this._bodyInit = body;
        if (!body) {
          this._noBody = true;
          this._bodyText = "";
        } else if (typeof body === "string") {
          this._bodyText = body;
        } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
          this._bodyBlob = body;
        } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
          this._bodyFormData = body;
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this._bodyText = body.toString();
        } else if (support.arrayBuffer && support.blob && isDataView(body)) {
          this._bodyArrayBuffer = bufferClone(body.buffer);
          this._bodyInit = new Blob([this._bodyArrayBuffer]);
        } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
          this._bodyArrayBuffer = bufferClone(body);
        } else {
          this._bodyText = body = Object.prototype.toString.call(body);
        }
        if (!this.headers.get("content-type")) {
          if (typeof body === "string") {
            this.headers.set("content-type", "text/plain;charset=UTF-8");
          } else if (this._bodyBlob && this._bodyBlob.type) {
            this.headers.set("content-type", this._bodyBlob.type);
          } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
            this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
          }
        }
      };
      if (support.blob) {
        this.blob = function() {
          var rejected = consumed(this);
          if (rejected) {
            return rejected;
          }
          if (this._bodyBlob) {
            return Promise.resolve(this._bodyBlob);
          } else if (this._bodyArrayBuffer) {
            return Promise.resolve(new Blob([this._bodyArrayBuffer]));
          } else if (this._bodyFormData) {
            throw new Error("could not read FormData body as blob");
          } else {
            return Promise.resolve(new Blob([this._bodyText]));
          }
        };
      }
      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          var isConsumed = consumed(this);
          if (isConsumed) {
            return isConsumed;
          } else if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
            return Promise.resolve(
              this._bodyArrayBuffer.buffer.slice(
                this._bodyArrayBuffer.byteOffset,
                this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
              )
            );
          } else {
            return Promise.resolve(this._bodyArrayBuffer);
          }
        } else if (support.blob) {
          return this.blob().then(readBlobAsArrayBuffer);
        } else {
          throw new Error("could not read as ArrayBuffer");
        }
      };
      this.text = function() {
        var rejected = consumed(this);
        if (rejected) {
          return rejected;
        }
        if (this._bodyBlob) {
          return readBlobAsText(this._bodyBlob);
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
        } else if (this._bodyFormData) {
          throw new Error("could not read FormData body as text");
        } else {
          return Promise.resolve(this._bodyText);
        }
      };
      if (support.formData) {
        this.formData = function() {
          return this.text().then(decode);
        };
      }
      this.json = function() {
        return this.text().then(JSON.parse);
      };
      return this;
    }
    var methods = ["CONNECT", "DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT", "TRACE"];
    function normalizeMethod(method) {
      var upcased = method.toUpperCase();
      return methods.indexOf(upcased) > -1 ? upcased : method;
    }
    function Request(input, options) {
      if (!(this instanceof Request)) {
        throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
      }
      options = options || {};
      var body = options.body;
      if (input instanceof Request) {
        if (input.bodyUsed) {
          throw new TypeError("Already read");
        }
        this.url = input.url;
        this.credentials = input.credentials;
        if (!options.headers) {
          this.headers = new Headers(input.headers);
        }
        this.method = input.method;
        this.mode = input.mode;
        this.signal = input.signal;
        if (!body && input._bodyInit != null) {
          body = input._bodyInit;
          input.bodyUsed = true;
        }
      } else {
        this.url = String(input);
      }
      this.credentials = options.credentials || this.credentials || "same-origin";
      if (options.headers || !this.headers) {
        this.headers = new Headers(options.headers);
      }
      this.method = normalizeMethod(options.method || this.method || "GET");
      this.mode = options.mode || this.mode || null;
      this.signal = options.signal || this.signal || function() {
        if ("AbortController" in g) {
          var ctrl = new AbortController();
          return ctrl.signal;
        }
      }();
      this.referrer = null;
      if ((this.method === "GET" || this.method === "HEAD") && body) {
        throw new TypeError("Body not allowed for GET or HEAD requests");
      }
      this._initBody(body);
      if (this.method === "GET" || this.method === "HEAD") {
        if (options.cache === "no-store" || options.cache === "no-cache") {
          var reParamSearch = /([?&])_=[^&]*/;
          if (reParamSearch.test(this.url)) {
            this.url = this.url.replace(reParamSearch, "$1_=" + (/* @__PURE__ */ new Date()).getTime());
          } else {
            var reQueryString = /\?/;
            this.url += (reQueryString.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
          }
        }
      }
    }
    Request.prototype.clone = function() {
      return new Request(this, { body: this._bodyInit });
    };
    function decode(body) {
      var form = new FormData();
      body.trim().split("&").forEach(function(bytes) {
        if (bytes) {
          var split = bytes.split("=");
          var name = split.shift().replace(/\+/g, " ");
          var value = split.join("=").replace(/\+/g, " ");
          form.append(decodeURIComponent(name), decodeURIComponent(value));
        }
      });
      return form;
    }
    function parseHeaders(rawHeaders) {
      var headers = new Headers();
      var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
      preProcessedHeaders.split("\r").map(function(header) {
        return header.indexOf("\n") === 0 ? header.substr(1, header.length) : header;
      }).forEach(function(line) {
        var parts = line.split(":");
        var key = parts.shift().trim();
        if (key) {
          var value = parts.join(":").trim();
          try {
            headers.append(key, value);
          } catch (error) {
            console.warn("Response " + error.message);
          }
        }
      });
      return headers;
    }
    Body.call(Request.prototype);
    function Response(bodyInit, options) {
      if (!(this instanceof Response)) {
        throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
      }
      if (!options) {
        options = {};
      }
      this.type = "default";
      this.status = options.status === void 0 ? 200 : options.status;
      if (this.status < 200 || this.status > 599) {
        throw new RangeError("Failed to construct 'Response': The status provided (0) is outside the range [200, 599].");
      }
      this.ok = this.status >= 200 && this.status < 300;
      this.statusText = options.statusText === void 0 ? "" : "" + options.statusText;
      this.headers = new Headers(options.headers);
      this.url = options.url || "";
      this._initBody(bodyInit);
    }
    Body.call(Response.prototype);
    Response.prototype.clone = function() {
      return new Response(this._bodyInit, {
        status: this.status,
        statusText: this.statusText,
        headers: new Headers(this.headers),
        url: this.url
      });
    };
    Response.error = function() {
      var response = new Response(null, { status: 200, statusText: "" });
      response.ok = false;
      response.status = 0;
      response.type = "error";
      return response;
    };
    var redirectStatuses = [301, 302, 303, 307, 308];
    Response.redirect = function(url, status) {
      if (redirectStatuses.indexOf(status) === -1) {
        throw new RangeError("Invalid status code");
      }
      return new Response(null, { status, headers: { location: url } });
    };
    var DOMException = g.DOMException;
    try {
      new DOMException();
    } catch (err) {
      DOMException = function(message, name) {
        this.message = message;
        this.name = name;
        var error = Error(message);
        this.stack = error.stack;
      };
      DOMException.prototype = Object.create(Error.prototype);
      DOMException.prototype.constructor = DOMException;
    }
    function fetch$2(input, init2) {
      return new Promise(function(resolve, reject) {
        var request = new Request(input, init2);
        if (request.signal && request.signal.aborted) {
          return reject(new DOMException("Aborted", "AbortError"));
        }
        var xhr = new XMLHttpRequest();
        function abortXhr() {
          xhr.abort();
        }
        xhr.onload = function() {
          var options = {
            statusText: xhr.statusText,
            headers: parseHeaders(xhr.getAllResponseHeaders() || "")
          };
          if (request.url.indexOf("file://") === 0 && (xhr.status < 200 || xhr.status > 599)) {
            options.status = 200;
          } else {
            options.status = xhr.status;
          }
          options.url = "responseURL" in xhr ? xhr.responseURL : options.headers.get("X-Request-URL");
          var body = "response" in xhr ? xhr.response : xhr.responseText;
          setTimeout(function() {
            resolve(new Response(body, options));
          }, 0);
        };
        xhr.onerror = function() {
          setTimeout(function() {
            reject(new TypeError("Network request failed"));
          }, 0);
        };
        xhr.ontimeout = function() {
          setTimeout(function() {
            reject(new TypeError("Network request timed out"));
          }, 0);
        };
        xhr.onabort = function() {
          setTimeout(function() {
            reject(new DOMException("Aborted", "AbortError"));
          }, 0);
        };
        function fixUrl(url) {
          try {
            return url === "" && g.location.href ? g.location.href : url;
          } catch (e2) {
            return url;
          }
        }
        xhr.open(request.method, fixUrl(request.url), true);
        if (request.credentials === "include") {
          xhr.withCredentials = true;
        } else if (request.credentials === "omit") {
          xhr.withCredentials = false;
        }
        if ("responseType" in xhr) {
          if (support.blob) {
            xhr.responseType = "blob";
          } else if (support.arrayBuffer) {
            xhr.responseType = "arraybuffer";
          }
        }
        if (init2 && typeof init2.headers === "object" && !(init2.headers instanceof Headers || g.Headers && init2.headers instanceof g.Headers)) {
          var names = [];
          Object.getOwnPropertyNames(init2.headers).forEach(function(name) {
            names.push(normalizeName(name));
            xhr.setRequestHeader(name, normalizeValue(init2.headers[name]));
          });
          request.headers.forEach(function(value, name) {
            if (names.indexOf(name) === -1) {
              xhr.setRequestHeader(name, value);
            }
          });
        } else {
          request.headers.forEach(function(value, name) {
            xhr.setRequestHeader(name, value);
          });
        }
        if (request.signal) {
          request.signal.addEventListener("abort", abortXhr);
          xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
              request.signal.removeEventListener("abort", abortXhr);
            }
          };
        }
        xhr.send(typeof request._bodyInit === "undefined" ? null : request._bodyInit);
      });
    }
    fetch$2.polyfill = true;
    if (!g.fetch) {
      g.fetch = fetch$2;
      g.Headers = Headers;
      g.Request = Request;
      g.Response = Response;
    }
    var fetchNpmBrowserify = self.fetch.bind(self);
    const fetch$1 = /* @__PURE__ */ getDefaultExportFromCjs(fetchNpmBrowserify);
    const handle = (promise) => {
      return promise.then((data) => [void 0, data]).catch((error) => Promise.resolve([error, void 0]));
    };
    function doRequest(url, options, contentType) {
      return __async(this, null, function* () {
        const auth = api$1.get("Authorization");
        const controller = new AbortController();
        const customOptions = __spreadValues({
          signal: controller.signal,
          timeout: 5e3,
          headers: { Authorization: "Bearer " + auth }
        }, options);
        if (contentType)
          customOptions.headers["Content-Type"] = contentType;
        const timeoutId = setTimeout(() => controller.abort(), customOptions.timeout);
        return fetch$1(url, customOptions).then((response) => {
          clearTimeout(timeoutId);
          if (response.ok) {
            return Promise.resolve(response);
          } else if (response.status === 401 || response.status === 403) {
            api$1.remove("Authorization");
            window.location.href = "/";
          } else {
            return Promise.reject(response);
          }
        }).then((r2) => r2 == null ? void 0 : r2.text()).then((json) => {
          try {
            return JSON.parse(json);
          } catch (err) {
            return json;
          }
        });
      });
    }
    const createHttpClient = (base) => {
      return {
        doGet: (path, options = {}) => {
          return doRequest(`${base}${path}`, __spreadValues({ method: "GET" }, options));
        },
        doPost: (path, options = {}) => {
          return doRequest(`${base}${path}`, __spreadValues({ method: "POST" }, options), "application/json");
        },
        doPut: (path, options = {}) => {
          return doRequest(`${base}${path}`, __spreadValues({ method: "PUT" }, options), "application/json");
        },
        doDelete: (path, options = {}) => {
          return doRequest(`${base}${path}`, __spreadValues({ method: "DELETE" }, options));
        },
        doPostForm: (path, options = {}) => {
          return doRequest(`${base}${path}`, __spreadValues({ method: "POST" }, options));
        }
      };
    };
    const API_URL = "http://influencer.diffday.org:8070";
    const api = createHttpClient(`${API_URL}`);
    const uploadFile = (file) => __async(exports, null, function* () {
      var form = new FormData();
      form.append("file", file);
      console.log(file);
      const [error, res] = yield handle(
        api.doPostForm("/api/file/upload/temp", {
          body: form
        })
      );
      if (error) {
        console.log(error);
      }
      return res;
    });
    function create_fragment$e(ctx) {
      let div;
      let label;
      let t0;
      let label_for_value;
      let t1;
      let input;
      let input_id_value;
      let mounted;
      let dispose;
      return {
        c() {
          div = element("div");
          label = element("label");
          t0 = text("파일선택");
          t1 = space();
          input = element("input");
          attr(label, "for", label_for_value = /*id*/
          ctx[0] + "-file");
          attr(input, "type", "file");
          attr(input, "id", input_id_value = /*id*/
          ctx[0] + "-file");
          attr(div, "class", "filebox");
          set_style(div, "margin-top", "10px");
        },
        m(target, anchor) {
          insert(target, div, anchor);
          append(div, label);
          append(label, t0);
          append(div, t1);
          append(div, input);
          if (!mounted) {
            dispose = listen(
              input,
              "input",
              /*handleInput*/
              ctx[1]
            );
            mounted = true;
          }
        },
        p(ctx2, [dirty]) {
          if (dirty & /*id*/
          1 && label_for_value !== (label_for_value = /*id*/
          ctx2[0] + "-file")) {
            attr(label, "for", label_for_value);
          }
          if (dirty & /*id*/
          1 && input_id_value !== (input_id_value = /*id*/
          ctx2[0] + "-file")) {
            attr(input, "id", input_id_value);
          }
        },
        i: noop,
        o: noop,
        d(detaching) {
          if (detaching)
            detach(div);
          mounted = false;
          dispose();
        }
      };
    }
    function instance$d($$self, $$props, $$invalidate) {
      let { id = "" } = $$props;
      let { value = "" } = $$props;
      let { classes = "form-control" } = $$props;
      let { onUpdate = () => {
      } } = $$props;
      function handleInput(e2) {
        return __async(this, null, function* () {
          var files = e2.target.files;
          if (files.length < 1) {
            return;
          }
          const res = yield uploadFile(files[0]);
          if (res.status === 200) {
            var uuid = res.data[0].uuid;
            onUpdate(id, uuid);
          }
        });
      }
      $$self.$$set = ($$props2) => {
        if ("id" in $$props2)
          $$invalidate(0, id = $$props2.id);
        if ("value" in $$props2)
          $$invalidate(2, value = $$props2.value);
        if ("classes" in $$props2)
          $$invalidate(3, classes = $$props2.classes);
        if ("onUpdate" in $$props2)
          $$invalidate(4, onUpdate = $$props2.onUpdate);
      };
      return [id, handleInput, value, classes, onUpdate];
    }
    class FileInput extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$d, create_fragment$e, safe_not_equal, { id: 0, value: 2, classes: 3, onUpdate: 4 });
      }
    }
    const JsonView_svelte_svelte_type_style_lang = "";
    function create_fragment$d(ctx) {
      let div1;
      let span;
      let t0;
      let div0;
      let input;
      let t1;
      let label;
      let mounted;
      let dispose;
      return {
        c() {
          div1 = element("div");
          span = element("span");
          span.innerHTML = `<i class="bi bi-search"></i>`;
          t0 = space();
          div0 = element("div");
          input = element("input");
          t1 = space();
          label = element("label");
          label.textContent = "Search";
          attr(span, "class", "input-group-text");
          attr(input, "type", "text");
          attr(input, "class", "form-control");
          attr(input, "id", "floatingInputGroup1");
          attr(input, "placeholder", "Search");
          attr(label, "for", "floatingInputGroup1");
          attr(div0, "class", "form-floating");
          attr(div1, "class", "searchbox input-group mb-3");
        },
        m(target, anchor) {
          insert(target, div1, anchor);
          append(div1, span);
          append(div1, t0);
          append(div1, div0);
          append(div0, input);
          set_input_value(
            input,
            /*text*/
            ctx[0]
          );
          append(div0, t1);
          append(div0, label);
          if (!mounted) {
            dispose = listen(
              input,
              "input",
              /*input_input_handler*/
              ctx[2]
            );
            mounted = true;
          }
        },
        p(ctx2, [dirty]) {
          if (dirty & /*text*/
          1 && input.value !== /*text*/
          ctx2[0]) {
            set_input_value(
              input,
              /*text*/
              ctx2[0]
            );
          }
        },
        i: noop,
        o: noop,
        d(detaching) {
          if (detaching)
            detach(div1);
          mounted = false;
          dispose();
        }
      };
    }
    function instance$c($$self, $$props, $$invalidate) {
      let { updateHandler = () => {
      } } = $$props;
      let text2 = "";
      function input_input_handler() {
        text2 = this.value;
        $$invalidate(0, text2);
      }
      $$self.$$set = ($$props2) => {
        if ("updateHandler" in $$props2)
          $$invalidate(1, updateHandler = $$props2.updateHandler);
      };
      $$self.$$.update = () => {
        if ($$self.$$.dirty & /*updateHandler, text*/
        3) {
          {
            if (!!updateHandler) {
              updateHandler(text2);
            }
          }
        }
      };
      return [text2, updateHandler, input_input_handler];
    }
    class Search extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$c, create_fragment$d, safe_not_equal, { updateHandler: 1 });
      }
    }
    function get_each_context$6(ctx, list, i2) {
      const child_ctx = ctx.slice();
      child_ctx[9] = list[i2];
      return child_ctx;
    }
    function create_if_block$5(ctx) {
      let each_1_anchor;
      let current;
      let each_value = (
        /*value*/
        ctx[0]
      );
      let each_blocks = [];
      for (let i2 = 0; i2 < each_value.length; i2 += 1) {
        each_blocks[i2] = create_each_block$6(get_each_context$6(ctx, each_value, i2));
      }
      const out = (i2) => transition_out(each_blocks[i2], 1, 1, () => {
        each_blocks[i2] = null;
      });
      return {
        c() {
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            each_blocks[i2].c();
          }
          each_1_anchor = empty();
        },
        m(target, anchor) {
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            if (each_blocks[i2]) {
              each_blocks[i2].m(target, anchor);
            }
          }
          insert(target, each_1_anchor, anchor);
          current = true;
        },
        p(ctx2, dirty) {
          if (dirty & /*value, trim*/
          1) {
            each_value = /*value*/
            ctx2[0];
            let i2;
            for (i2 = 0; i2 < each_value.length; i2 += 1) {
              const child_ctx = get_each_context$6(ctx2, each_value, i2);
              if (each_blocks[i2]) {
                each_blocks[i2].p(child_ctx, dirty);
                transition_in(each_blocks[i2], 1);
              } else {
                each_blocks[i2] = create_each_block$6(child_ctx);
                each_blocks[i2].c();
                transition_in(each_blocks[i2], 1);
                each_blocks[i2].m(each_1_anchor.parentNode, each_1_anchor);
              }
            }
            group_outros();
            for (i2 = each_value.length; i2 < each_blocks.length; i2 += 1) {
              out(i2);
            }
            check_outros();
          }
        },
        i(local) {
          if (current)
            return;
          for (let i2 = 0; i2 < each_value.length; i2 += 1) {
            transition_in(each_blocks[i2]);
          }
          current = true;
        },
        o(local) {
          each_blocks = each_blocks.filter(Boolean);
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            transition_out(each_blocks[i2]);
          }
          current = false;
        },
        d(detaching) {
          destroy_each(each_blocks, detaching);
          if (detaching)
            detach(each_1_anchor);
        }
      };
    }
    function create_default_slot(ctx) {
      let svg;
      let path;
      return {
        c() {
          svg = svg_element("svg");
          path = svg_element("path");
          attr(path, "d", "M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z");
          attr(svg, "xmlns", "http://www.w3.org/2000/svg");
          attr(svg, "width", "16");
          attr(svg, "height", "16");
          attr(svg, "fill", "currentColor");
          attr(svg, "class", "bi bi-x");
          attr(svg, "viewBox", "0 0 16 16");
        },
        m(target, anchor) {
          insert(target, svg, anchor);
          append(svg, path);
        },
        p: noop,
        d(detaching) {
          if (detaching)
            detach(svg);
        }
      };
    }
    function create_each_block$6(ctx) {
      let li;
      let button;
      let t2;
      let current;
      button = new Button({
        props: {
          classes: "btn btn-small btn-fill-grey3 me-1",
          text: (
            /*val*/
            ctx[9]
          ),
          $$slots: { default: [create_default_slot] },
          $$scope: { ctx }
        }
      });
      button.$on(
        "click",
        /*click_handler*/
        ctx[6]
      );
      return {
        c() {
          li = element("li");
          create_component(button.$$.fragment);
          t2 = space();
          attr(li, "class", "d-inline");
        },
        m(target, anchor) {
          insert(target, li, anchor);
          mount_component(button, li, null);
          append(li, t2);
          current = true;
        },
        p(ctx2, dirty) {
          const button_changes = {};
          if (dirty & /*value*/
          1)
            button_changes.text = /*val*/
            ctx2[9];
          if (dirty & /*$$scope*/
          4096) {
            button_changes.$$scope = { dirty, ctx: ctx2 };
          }
          button.$set(button_changes);
        },
        i(local) {
          if (current)
            return;
          transition_in(button.$$.fragment, local);
          current = true;
        },
        o(local) {
          transition_out(button.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(li);
          destroy_component(button);
        }
      };
    }
    function create_fragment$c(ctx) {
      let div1;
      let div0;
      let t0;
      let t1;
      let t2;
      let li;
      let input;
      let current;
      let mounted;
      let dispose;
      let if_block = (
        /*value*/
        ctx[0] && create_if_block$5(ctx)
      );
      let input_levels = [
        { type: "text" },
        { class: "border-0 w-auto" },
        { id: (
          /*id*/
          ctx[1]
        ) },
        { disabled: (
          /*disabled*/
          ctx[2]
        ) },
        /*$$restProps*/
        ctx[5],
        { placeholder: "Type to search..." },
        { style: "outline: none;" }
      ];
      let input_data = {};
      for (let i2 = 0; i2 < input_levels.length; i2 += 1) {
        input_data = assign$1(input_data, input_levels[i2]);
      }
      return {
        c() {
          div1 = element("div");
          div0 = element("div");
          t0 = text(
            /*value*/
            ctx[0]
          );
          t1 = space();
          if (if_block)
            if_block.c();
          t2 = space();
          li = element("li");
          input = element("input");
          attr(div0, "class", "d-none");
          set_attributes(input, input_data);
          attr(li, "class", "d-inline");
          attr(div1, "class", "form-control");
        },
        m(target, anchor) {
          insert(target, div1, anchor);
          append(div1, div0);
          append(div0, t0);
          append(div1, t1);
          if (if_block)
            if_block.m(div1, null);
          append(div1, t2);
          append(div1, li);
          append(li, input);
          if (input.autofocus)
            input.focus();
          set_input_value(
            input,
            /*currentValue*/
            ctx[4]
          );
          current = true;
          if (!mounted) {
            dispose = [
              listen(
                input,
                "input",
                /*input_input_handler*/
                ctx[7]
              ),
              listen(
                input,
                "keyup",
                /*keyup_handler*/
                ctx[8]
              ),
              listen(div1, "click", click_handler_1)
            ];
            mounted = true;
          }
        },
        p(ctx2, [dirty]) {
          if (!current || dirty & /*value*/
          1)
            set_data(
              t0,
              /*value*/
              ctx2[0]
            );
          if (
            /*value*/
            ctx2[0]
          ) {
            if (if_block) {
              if_block.p(ctx2, dirty);
              if (dirty & /*value*/
              1) {
                transition_in(if_block, 1);
              }
            } else {
              if_block = create_if_block$5(ctx2);
              if_block.c();
              transition_in(if_block, 1);
              if_block.m(div1, t2);
            }
          } else if (if_block) {
            group_outros();
            transition_out(if_block, 1, 1, () => {
              if_block = null;
            });
            check_outros();
          }
          set_attributes(input, input_data = get_spread_update(input_levels, [
            { type: "text" },
            { class: "border-0 w-auto" },
            (!current || dirty & /*id*/
            2) && { id: (
              /*id*/
              ctx2[1]
            ) },
            (!current || dirty & /*disabled*/
            4) && { disabled: (
              /*disabled*/
              ctx2[2]
            ) },
            dirty & /*$$restProps*/
            32 && /*$$restProps*/
            ctx2[5],
            { placeholder: "Type to search..." },
            { style: "outline: none;" }
          ]));
          if (dirty & /*currentValue*/
          16 && input.value !== /*currentValue*/
          ctx2[4]) {
            set_input_value(
              input,
              /*currentValue*/
              ctx2[4]
            );
          }
        },
        i(local) {
          if (current)
            return;
          transition_in(if_block);
          current = true;
        },
        o(local) {
          transition_out(if_block);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(div1);
          if (if_block)
            if_block.d();
          mounted = false;
          run_all(dispose);
        }
      };
    }
    const click_handler_1 = (e2) => e2.target.querySelector("input").focus();
    function instance$b($$self, $$props, $$invalidate) {
      const omit_props_names = ["id", "value", "disabled"];
      let $$restProps = compute_rest_props($$props, omit_props_names);
      let { id } = $$props;
      let { value = [] } = $$props;
      let { disabled = false } = $$props;
      let prev = -1;
      let currentValue = "";
      if (value) {
        value.forEach((val, idx) => $$invalidate(0, value[idx] = trim(val), value));
      }
      const click_handler2 = (e2) => {
        const target = trim(e2.currentTarget.parentNode.innerText);
        $$invalidate(0, value = value.filter((val) => target && target !== val));
      };
      function input_input_handler() {
        currentValue = this.value;
        $$invalidate(4, currentValue);
      }
      const keyup_handler = (e2) => {
        e2.preventDefault();
        e2.stopPropagation();
        if (e2.keyCode === 13) {
          const ids = trim(e2.target.value);
          if (ids) {
            value.push(...ids.split(","));
            $$invalidate(0, value);
            $$invalidate(4, currentValue = e2.target.value = "");
          }
          $$invalidate(3, prev = e2.keyCode);
        } else if (e2.keyCode === 8) {
          if (prev === 8 && isEmpty(currentValue)) {
            value.pop();
            $$invalidate(0, value);
            $$invalidate(3, prev = -1);
          } else {
            $$invalidate(3, prev = e2.keyCode);
          }
        } else {
          $$invalidate(3, prev = e2.keyCode);
        }
      };
      $$self.$$set = ($$new_props) => {
        $$props = assign$1(assign$1({}, $$props), exclude_internal_props($$new_props));
        $$invalidate(5, $$restProps = compute_rest_props($$props, omit_props_names));
        if ("id" in $$new_props)
          $$invalidate(1, id = $$new_props.id);
        if ("value" in $$new_props)
          $$invalidate(0, value = $$new_props.value);
        if ("disabled" in $$new_props)
          $$invalidate(2, disabled = $$new_props.disabled);
      };
      return [
        value,
        id,
        disabled,
        prev,
        currentValue,
        $$restProps,
        click_handler2,
        input_input_handler,
        keyup_handler
      ];
    }
    class InputTags extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$b, create_fragment$c, safe_not_equal, { id: 1, value: 0, disabled: 2 });
      }
    }
    const html = "";
    const annotated = "";
    var diffMatchPatch = { exports: {} };
    (function(module2) {
      var diff_match_patch = function() {
        this.Diff_Timeout = 1;
        this.Diff_EditCost = 4;
        this.Match_Threshold = 0.5;
        this.Match_Distance = 1e3;
        this.Patch_DeleteThreshold = 0.5;
        this.Patch_Margin = 4;
        this.Match_MaxBits = 32;
      };
      var DIFF_DELETE = -1;
      var DIFF_INSERT = 1;
      var DIFF_EQUAL = 0;
      diff_match_patch.Diff = function(op, text2) {
        return [op, text2];
      };
      diff_match_patch.prototype.diff_main = function(text1, text2, opt_checklines, opt_deadline) {
        if (typeof opt_deadline == "undefined") {
          if (this.Diff_Timeout <= 0) {
            opt_deadline = Number.MAX_VALUE;
          } else {
            opt_deadline = (/* @__PURE__ */ new Date()).getTime() + this.Diff_Timeout * 1e3;
          }
        }
        var deadline = opt_deadline;
        if (text1 == null || text2 == null) {
          throw new Error("Null input. (diff_main)");
        }
        if (text1 == text2) {
          if (text1) {
            return [new diff_match_patch.Diff(DIFF_EQUAL, text1)];
          }
          return [];
        }
        if (typeof opt_checklines == "undefined") {
          opt_checklines = true;
        }
        var checklines = opt_checklines;
        var commonlength = this.diff_commonPrefix(text1, text2);
        var commonprefix = text1.substring(0, commonlength);
        text1 = text1.substring(commonlength);
        text2 = text2.substring(commonlength);
        commonlength = this.diff_commonSuffix(text1, text2);
        var commonsuffix = text1.substring(text1.length - commonlength);
        text1 = text1.substring(0, text1.length - commonlength);
        text2 = text2.substring(0, text2.length - commonlength);
        var diffs = this.diff_compute_(text1, text2, checklines, deadline);
        if (commonprefix) {
          diffs.unshift(new diff_match_patch.Diff(DIFF_EQUAL, commonprefix));
        }
        if (commonsuffix) {
          diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, commonsuffix));
        }
        this.diff_cleanupMerge(diffs);
        return diffs;
      };
      diff_match_patch.prototype.diff_compute_ = function(text1, text2, checklines, deadline) {
        var diffs;
        if (!text1) {
          return [new diff_match_patch.Diff(DIFF_INSERT, text2)];
        }
        if (!text2) {
          return [new diff_match_patch.Diff(DIFF_DELETE, text1)];
        }
        var longtext = text1.length > text2.length ? text1 : text2;
        var shorttext = text1.length > text2.length ? text2 : text1;
        var i2 = longtext.indexOf(shorttext);
        if (i2 != -1) {
          diffs = [
            new diff_match_patch.Diff(DIFF_INSERT, longtext.substring(0, i2)),
            new diff_match_patch.Diff(DIFF_EQUAL, shorttext),
            new diff_match_patch.Diff(
              DIFF_INSERT,
              longtext.substring(i2 + shorttext.length)
            )
          ];
          if (text1.length > text2.length) {
            diffs[0][0] = diffs[2][0] = DIFF_DELETE;
          }
          return diffs;
        }
        if (shorttext.length == 1) {
          return [
            new diff_match_patch.Diff(DIFF_DELETE, text1),
            new diff_match_patch.Diff(DIFF_INSERT, text2)
          ];
        }
        var hm = this.diff_halfMatch_(text1, text2);
        if (hm) {
          var text1_a = hm[0];
          var text1_b = hm[1];
          var text2_a = hm[2];
          var text2_b = hm[3];
          var mid_common = hm[4];
          var diffs_a = this.diff_main(text1_a, text2_a, checklines, deadline);
          var diffs_b = this.diff_main(text1_b, text2_b, checklines, deadline);
          return diffs_a.concat(
            [new diff_match_patch.Diff(DIFF_EQUAL, mid_common)],
            diffs_b
          );
        }
        if (checklines && text1.length > 100 && text2.length > 100) {
          return this.diff_lineMode_(text1, text2, deadline);
        }
        return this.diff_bisect_(text1, text2, deadline);
      };
      diff_match_patch.prototype.diff_lineMode_ = function(text1, text2, deadline) {
        var a2 = this.diff_linesToChars_(text1, text2);
        text1 = a2.chars1;
        text2 = a2.chars2;
        var linearray = a2.lineArray;
        var diffs = this.diff_main(text1, text2, false, deadline);
        this.diff_charsToLines_(diffs, linearray);
        this.diff_cleanupSemantic(diffs);
        diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, ""));
        var pointer = 0;
        var count_delete = 0;
        var count_insert = 0;
        var text_delete = "";
        var text_insert = "";
        while (pointer < diffs.length) {
          switch (diffs[pointer][0]) {
            case DIFF_INSERT:
              count_insert++;
              text_insert += diffs[pointer][1];
              break;
            case DIFF_DELETE:
              count_delete++;
              text_delete += diffs[pointer][1];
              break;
            case DIFF_EQUAL:
              if (count_delete >= 1 && count_insert >= 1) {
                diffs.splice(
                  pointer - count_delete - count_insert,
                  count_delete + count_insert
                );
                pointer = pointer - count_delete - count_insert;
                var subDiff = this.diff_main(text_delete, text_insert, false, deadline);
                for (var j2 = subDiff.length - 1; j2 >= 0; j2--) {
                  diffs.splice(pointer, 0, subDiff[j2]);
                }
                pointer = pointer + subDiff.length;
              }
              count_insert = 0;
              count_delete = 0;
              text_delete = "";
              text_insert = "";
              break;
          }
          pointer++;
        }
        diffs.pop();
        return diffs;
      };
      diff_match_patch.prototype.diff_bisect_ = function(text1, text2, deadline) {
        var text1_length = text1.length;
        var text2_length = text2.length;
        var max_d = Math.ceil((text1_length + text2_length) / 2);
        var v_offset = max_d;
        var v_length = 2 * max_d;
        var v1 = new Array(v_length);
        var v2 = new Array(v_length);
        for (var x2 = 0; x2 < v_length; x2++) {
          v1[x2] = -1;
          v2[x2] = -1;
        }
        v1[v_offset + 1] = 0;
        v2[v_offset + 1] = 0;
        var delta = text1_length - text2_length;
        var front = delta % 2 != 0;
        var k1start = 0;
        var k1end = 0;
        var k2start = 0;
        var k2end = 0;
        for (var d2 = 0; d2 < max_d; d2++) {
          if ((/* @__PURE__ */ new Date()).getTime() > deadline) {
            break;
          }
          for (var k1 = -d2 + k1start; k1 <= d2 - k1end; k1 += 2) {
            var k1_offset = v_offset + k1;
            var x1;
            if (k1 == -d2 || k1 != d2 && v1[k1_offset - 1] < v1[k1_offset + 1]) {
              x1 = v1[k1_offset + 1];
            } else {
              x1 = v1[k1_offset - 1] + 1;
            }
            var y1 = x1 - k1;
            while (x1 < text1_length && y1 < text2_length && text1.charAt(x1) == text2.charAt(y1)) {
              x1++;
              y1++;
            }
            v1[k1_offset] = x1;
            if (x1 > text1_length) {
              k1end += 2;
            } else if (y1 > text2_length) {
              k1start += 2;
            } else if (front) {
              var k2_offset = v_offset + delta - k1;
              if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] != -1) {
                var x22 = text1_length - v2[k2_offset];
                if (x1 >= x22) {
                  return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
                }
              }
            }
          }
          for (var k2 = -d2 + k2start; k2 <= d2 - k2end; k2 += 2) {
            var k2_offset = v_offset + k2;
            var x22;
            if (k2 == -d2 || k2 != d2 && v2[k2_offset - 1] < v2[k2_offset + 1]) {
              x22 = v2[k2_offset + 1];
            } else {
              x22 = v2[k2_offset - 1] + 1;
            }
            var y2 = x22 - k2;
            while (x22 < text1_length && y2 < text2_length && text1.charAt(text1_length - x22 - 1) == text2.charAt(text2_length - y2 - 1)) {
              x22++;
              y2++;
            }
            v2[k2_offset] = x22;
            if (x22 > text1_length) {
              k2end += 2;
            } else if (y2 > text2_length) {
              k2start += 2;
            } else if (!front) {
              var k1_offset = v_offset + delta - k2;
              if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] != -1) {
                var x1 = v1[k1_offset];
                var y1 = v_offset + x1 - k1_offset;
                x22 = text1_length - x22;
                if (x1 >= x22) {
                  return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
                }
              }
            }
          }
        }
        return [
          new diff_match_patch.Diff(DIFF_DELETE, text1),
          new diff_match_patch.Diff(DIFF_INSERT, text2)
        ];
      };
      diff_match_patch.prototype.diff_bisectSplit_ = function(text1, text2, x2, y2, deadline) {
        var text1a = text1.substring(0, x2);
        var text2a = text2.substring(0, y2);
        var text1b = text1.substring(x2);
        var text2b = text2.substring(y2);
        var diffs = this.diff_main(text1a, text2a, false, deadline);
        var diffsb = this.diff_main(text1b, text2b, false, deadline);
        return diffs.concat(diffsb);
      };
      diff_match_patch.prototype.diff_linesToChars_ = function(text1, text2) {
        var lineArray = [];
        var lineHash = {};
        lineArray[0] = "";
        function diff_linesToCharsMunge_(text3) {
          var chars = "";
          var lineStart = 0;
          var lineEnd = -1;
          var lineArrayLength = lineArray.length;
          while (lineEnd < text3.length - 1) {
            lineEnd = text3.indexOf("\n", lineStart);
            if (lineEnd == -1) {
              lineEnd = text3.length - 1;
            }
            var line = text3.substring(lineStart, lineEnd + 1);
            if (lineHash.hasOwnProperty ? lineHash.hasOwnProperty(line) : lineHash[line] !== void 0) {
              chars += String.fromCharCode(lineHash[line]);
            } else {
              if (lineArrayLength == maxLines) {
                line = text3.substring(lineStart);
                lineEnd = text3.length;
              }
              chars += String.fromCharCode(lineArrayLength);
              lineHash[line] = lineArrayLength;
              lineArray[lineArrayLength++] = line;
            }
            lineStart = lineEnd + 1;
          }
          return chars;
        }
        var maxLines = 4e4;
        var chars1 = diff_linesToCharsMunge_(text1);
        maxLines = 65535;
        var chars2 = diff_linesToCharsMunge_(text2);
        return { chars1, chars2, lineArray };
      };
      diff_match_patch.prototype.diff_charsToLines_ = function(diffs, lineArray) {
        for (var i2 = 0; i2 < diffs.length; i2++) {
          var chars = diffs[i2][1];
          var text2 = [];
          for (var j2 = 0; j2 < chars.length; j2++) {
            text2[j2] = lineArray[chars.charCodeAt(j2)];
          }
          diffs[i2][1] = text2.join("");
        }
      };
      diff_match_patch.prototype.diff_commonPrefix = function(text1, text2) {
        if (!text1 || !text2 || text1.charAt(0) != text2.charAt(0)) {
          return 0;
        }
        var pointermin = 0;
        var pointermax = Math.min(text1.length, text2.length);
        var pointermid = pointermax;
        var pointerstart = 0;
        while (pointermin < pointermid) {
          if (text1.substring(pointerstart, pointermid) == text2.substring(pointerstart, pointermid)) {
            pointermin = pointermid;
            pointerstart = pointermin;
          } else {
            pointermax = pointermid;
          }
          pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
        }
        return pointermid;
      };
      diff_match_patch.prototype.diff_commonSuffix = function(text1, text2) {
        if (!text1 || !text2 || text1.charAt(text1.length - 1) != text2.charAt(text2.length - 1)) {
          return 0;
        }
        var pointermin = 0;
        var pointermax = Math.min(text1.length, text2.length);
        var pointermid = pointermax;
        var pointerend = 0;
        while (pointermin < pointermid) {
          if (text1.substring(text1.length - pointermid, text1.length - pointerend) == text2.substring(text2.length - pointermid, text2.length - pointerend)) {
            pointermin = pointermid;
            pointerend = pointermin;
          } else {
            pointermax = pointermid;
          }
          pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
        }
        return pointermid;
      };
      diff_match_patch.prototype.diff_commonOverlap_ = function(text1, text2) {
        var text1_length = text1.length;
        var text2_length = text2.length;
        if (text1_length == 0 || text2_length == 0) {
          return 0;
        }
        if (text1_length > text2_length) {
          text1 = text1.substring(text1_length - text2_length);
        } else if (text1_length < text2_length) {
          text2 = text2.substring(0, text1_length);
        }
        var text_length = Math.min(text1_length, text2_length);
        if (text1 == text2) {
          return text_length;
        }
        var best = 0;
        var length = 1;
        while (true) {
          var pattern = text1.substring(text_length - length);
          var found = text2.indexOf(pattern);
          if (found == -1) {
            return best;
          }
          length += found;
          if (found == 0 || text1.substring(text_length - length) == text2.substring(0, length)) {
            best = length;
            length++;
          }
        }
      };
      diff_match_patch.prototype.diff_halfMatch_ = function(text1, text2) {
        if (this.Diff_Timeout <= 0) {
          return null;
        }
        var longtext = text1.length > text2.length ? text1 : text2;
        var shorttext = text1.length > text2.length ? text2 : text1;
        if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
          return null;
        }
        var dmp = this;
        function diff_halfMatchI_(longtext2, shorttext2, i2) {
          var seed = longtext2.substring(i2, i2 + Math.floor(longtext2.length / 4));
          var j2 = -1;
          var best_common = "";
          var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
          while ((j2 = shorttext2.indexOf(seed, j2 + 1)) != -1) {
            var prefixLength = dmp.diff_commonPrefix(
              longtext2.substring(i2),
              shorttext2.substring(j2)
            );
            var suffixLength = dmp.diff_commonSuffix(
              longtext2.substring(0, i2),
              shorttext2.substring(0, j2)
            );
            if (best_common.length < suffixLength + prefixLength) {
              best_common = shorttext2.substring(j2 - suffixLength, j2) + shorttext2.substring(j2, j2 + prefixLength);
              best_longtext_a = longtext2.substring(0, i2 - suffixLength);
              best_longtext_b = longtext2.substring(i2 + prefixLength);
              best_shorttext_a = shorttext2.substring(0, j2 - suffixLength);
              best_shorttext_b = shorttext2.substring(j2 + prefixLength);
            }
          }
          if (best_common.length * 2 >= longtext2.length) {
            return [
              best_longtext_a,
              best_longtext_b,
              best_shorttext_a,
              best_shorttext_b,
              best_common
            ];
          } else {
            return null;
          }
        }
        var hm1 = diff_halfMatchI_(
          longtext,
          shorttext,
          Math.ceil(longtext.length / 4)
        );
        var hm2 = diff_halfMatchI_(
          longtext,
          shorttext,
          Math.ceil(longtext.length / 2)
        );
        var hm;
        if (!hm1 && !hm2) {
          return null;
        } else if (!hm2) {
          hm = hm1;
        } else if (!hm1) {
          hm = hm2;
        } else {
          hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
        }
        var text1_a, text1_b, text2_a, text2_b;
        if (text1.length > text2.length) {
          text1_a = hm[0];
          text1_b = hm[1];
          text2_a = hm[2];
          text2_b = hm[3];
        } else {
          text2_a = hm[0];
          text2_b = hm[1];
          text1_a = hm[2];
          text1_b = hm[3];
        }
        var mid_common = hm[4];
        return [text1_a, text1_b, text2_a, text2_b, mid_common];
      };
      diff_match_patch.prototype.diff_cleanupSemantic = function(diffs) {
        var changes = false;
        var equalities = [];
        var equalitiesLength = 0;
        var lastEquality = null;
        var pointer = 0;
        var length_insertions1 = 0;
        var length_deletions1 = 0;
        var length_insertions2 = 0;
        var length_deletions2 = 0;
        while (pointer < diffs.length) {
          if (diffs[pointer][0] == DIFF_EQUAL) {
            equalities[equalitiesLength++] = pointer;
            length_insertions1 = length_insertions2;
            length_deletions1 = length_deletions2;
            length_insertions2 = 0;
            length_deletions2 = 0;
            lastEquality = diffs[pointer][1];
          } else {
            if (diffs[pointer][0] == DIFF_INSERT) {
              length_insertions2 += diffs[pointer][1].length;
            } else {
              length_deletions2 += diffs[pointer][1].length;
            }
            if (lastEquality && lastEquality.length <= Math.max(length_insertions1, length_deletions1) && lastEquality.length <= Math.max(
              length_insertions2,
              length_deletions2
            )) {
              diffs.splice(
                equalities[equalitiesLength - 1],
                0,
                new diff_match_patch.Diff(DIFF_DELETE, lastEquality)
              );
              diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
              equalitiesLength--;
              equalitiesLength--;
              pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
              length_insertions1 = 0;
              length_deletions1 = 0;
              length_insertions2 = 0;
              length_deletions2 = 0;
              lastEquality = null;
              changes = true;
            }
          }
          pointer++;
        }
        if (changes) {
          this.diff_cleanupMerge(diffs);
        }
        this.diff_cleanupSemanticLossless(diffs);
        pointer = 1;
        while (pointer < diffs.length) {
          if (diffs[pointer - 1][0] == DIFF_DELETE && diffs[pointer][0] == DIFF_INSERT) {
            var deletion = diffs[pointer - 1][1];
            var insertion = diffs[pointer][1];
            var overlap_length1 = this.diff_commonOverlap_(deletion, insertion);
            var overlap_length2 = this.diff_commonOverlap_(insertion, deletion);
            if (overlap_length1 >= overlap_length2) {
              if (overlap_length1 >= deletion.length / 2 || overlap_length1 >= insertion.length / 2) {
                diffs.splice(pointer, 0, new diff_match_patch.Diff(
                  DIFF_EQUAL,
                  insertion.substring(0, overlap_length1)
                ));
                diffs[pointer - 1][1] = deletion.substring(0, deletion.length - overlap_length1);
                diffs[pointer + 1][1] = insertion.substring(overlap_length1);
                pointer++;
              }
            } else {
              if (overlap_length2 >= deletion.length / 2 || overlap_length2 >= insertion.length / 2) {
                diffs.splice(pointer, 0, new diff_match_patch.Diff(
                  DIFF_EQUAL,
                  deletion.substring(0, overlap_length2)
                ));
                diffs[pointer - 1][0] = DIFF_INSERT;
                diffs[pointer - 1][1] = insertion.substring(0, insertion.length - overlap_length2);
                diffs[pointer + 1][0] = DIFF_DELETE;
                diffs[pointer + 1][1] = deletion.substring(overlap_length2);
                pointer++;
              }
            }
            pointer++;
          }
          pointer++;
        }
      };
      diff_match_patch.prototype.diff_cleanupSemanticLossless = function(diffs) {
        function diff_cleanupSemanticScore_(one, two) {
          if (!one || !two) {
            return 6;
          }
          var char1 = one.charAt(one.length - 1);
          var char2 = two.charAt(0);
          var nonAlphaNumeric1 = char1.match(diff_match_patch.nonAlphaNumericRegex_);
          var nonAlphaNumeric2 = char2.match(diff_match_patch.nonAlphaNumericRegex_);
          var whitespace1 = nonAlphaNumeric1 && char1.match(diff_match_patch.whitespaceRegex_);
          var whitespace2 = nonAlphaNumeric2 && char2.match(diff_match_patch.whitespaceRegex_);
          var lineBreak1 = whitespace1 && char1.match(diff_match_patch.linebreakRegex_);
          var lineBreak2 = whitespace2 && char2.match(diff_match_patch.linebreakRegex_);
          var blankLine1 = lineBreak1 && one.match(diff_match_patch.blanklineEndRegex_);
          var blankLine2 = lineBreak2 && two.match(diff_match_patch.blanklineStartRegex_);
          if (blankLine1 || blankLine2) {
            return 5;
          } else if (lineBreak1 || lineBreak2) {
            return 4;
          } else if (nonAlphaNumeric1 && !whitespace1 && whitespace2) {
            return 3;
          } else if (whitespace1 || whitespace2) {
            return 2;
          } else if (nonAlphaNumeric1 || nonAlphaNumeric2) {
            return 1;
          }
          return 0;
        }
        var pointer = 1;
        while (pointer < diffs.length - 1) {
          if (diffs[pointer - 1][0] == DIFF_EQUAL && diffs[pointer + 1][0] == DIFF_EQUAL) {
            var equality1 = diffs[pointer - 1][1];
            var edit = diffs[pointer][1];
            var equality2 = diffs[pointer + 1][1];
            var commonOffset = this.diff_commonSuffix(equality1, edit);
            if (commonOffset) {
              var commonString = edit.substring(edit.length - commonOffset);
              equality1 = equality1.substring(0, equality1.length - commonOffset);
              edit = commonString + edit.substring(0, edit.length - commonOffset);
              equality2 = commonString + equality2;
            }
            var bestEquality1 = equality1;
            var bestEdit = edit;
            var bestEquality2 = equality2;
            var bestScore = diff_cleanupSemanticScore_(equality1, edit) + diff_cleanupSemanticScore_(edit, equality2);
            while (edit.charAt(0) === equality2.charAt(0)) {
              equality1 += edit.charAt(0);
              edit = edit.substring(1) + equality2.charAt(0);
              equality2 = equality2.substring(1);
              var score = diff_cleanupSemanticScore_(equality1, edit) + diff_cleanupSemanticScore_(edit, equality2);
              if (score >= bestScore) {
                bestScore = score;
                bestEquality1 = equality1;
                bestEdit = edit;
                bestEquality2 = equality2;
              }
            }
            if (diffs[pointer - 1][1] != bestEquality1) {
              if (bestEquality1) {
                diffs[pointer - 1][1] = bestEquality1;
              } else {
                diffs.splice(pointer - 1, 1);
                pointer--;
              }
              diffs[pointer][1] = bestEdit;
              if (bestEquality2) {
                diffs[pointer + 1][1] = bestEquality2;
              } else {
                diffs.splice(pointer + 1, 1);
                pointer--;
              }
            }
          }
          pointer++;
        }
      };
      diff_match_patch.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/;
      diff_match_patch.whitespaceRegex_ = /\s/;
      diff_match_patch.linebreakRegex_ = /[\r\n]/;
      diff_match_patch.blanklineEndRegex_ = /\n\r?\n$/;
      diff_match_patch.blanklineStartRegex_ = /^\r?\n\r?\n/;
      diff_match_patch.prototype.diff_cleanupEfficiency = function(diffs) {
        var changes = false;
        var equalities = [];
        var equalitiesLength = 0;
        var lastEquality = null;
        var pointer = 0;
        var pre_ins = false;
        var pre_del = false;
        var post_ins = false;
        var post_del = false;
        while (pointer < diffs.length) {
          if (diffs[pointer][0] == DIFF_EQUAL) {
            if (diffs[pointer][1].length < this.Diff_EditCost && (post_ins || post_del)) {
              equalities[equalitiesLength++] = pointer;
              pre_ins = post_ins;
              pre_del = post_del;
              lastEquality = diffs[pointer][1];
            } else {
              equalitiesLength = 0;
              lastEquality = null;
            }
            post_ins = post_del = false;
          } else {
            if (diffs[pointer][0] == DIFF_DELETE) {
              post_del = true;
            } else {
              post_ins = true;
            }
            if (lastEquality && (pre_ins && pre_del && post_ins && post_del || lastEquality.length < this.Diff_EditCost / 2 && pre_ins + pre_del + post_ins + post_del == 3)) {
              diffs.splice(
                equalities[equalitiesLength - 1],
                0,
                new diff_match_patch.Diff(DIFF_DELETE, lastEquality)
              );
              diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
              equalitiesLength--;
              lastEquality = null;
              if (pre_ins && pre_del) {
                post_ins = post_del = true;
                equalitiesLength = 0;
              } else {
                equalitiesLength--;
                pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
                post_ins = post_del = false;
              }
              changes = true;
            }
          }
          pointer++;
        }
        if (changes) {
          this.diff_cleanupMerge(diffs);
        }
      };
      diff_match_patch.prototype.diff_cleanupMerge = function(diffs) {
        diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, ""));
        var pointer = 0;
        var count_delete = 0;
        var count_insert = 0;
        var text_delete = "";
        var text_insert = "";
        var commonlength;
        while (pointer < diffs.length) {
          switch (diffs[pointer][0]) {
            case DIFF_INSERT:
              count_insert++;
              text_insert += diffs[pointer][1];
              pointer++;
              break;
            case DIFF_DELETE:
              count_delete++;
              text_delete += diffs[pointer][1];
              pointer++;
              break;
            case DIFF_EQUAL:
              if (count_delete + count_insert > 1) {
                if (count_delete !== 0 && count_insert !== 0) {
                  commonlength = this.diff_commonPrefix(text_insert, text_delete);
                  if (commonlength !== 0) {
                    if (pointer - count_delete - count_insert > 0 && diffs[pointer - count_delete - count_insert - 1][0] == DIFF_EQUAL) {
                      diffs[pointer - count_delete - count_insert - 1][1] += text_insert.substring(0, commonlength);
                    } else {
                      diffs.splice(0, 0, new diff_match_patch.Diff(
                        DIFF_EQUAL,
                        text_insert.substring(0, commonlength)
                      ));
                      pointer++;
                    }
                    text_insert = text_insert.substring(commonlength);
                    text_delete = text_delete.substring(commonlength);
                  }
                  commonlength = this.diff_commonSuffix(text_insert, text_delete);
                  if (commonlength !== 0) {
                    diffs[pointer][1] = text_insert.substring(text_insert.length - commonlength) + diffs[pointer][1];
                    text_insert = text_insert.substring(0, text_insert.length - commonlength);
                    text_delete = text_delete.substring(0, text_delete.length - commonlength);
                  }
                }
                pointer -= count_delete + count_insert;
                diffs.splice(pointer, count_delete + count_insert);
                if (text_delete.length) {
                  diffs.splice(
                    pointer,
                    0,
                    new diff_match_patch.Diff(DIFF_DELETE, text_delete)
                  );
                  pointer++;
                }
                if (text_insert.length) {
                  diffs.splice(
                    pointer,
                    0,
                    new diff_match_patch.Diff(DIFF_INSERT, text_insert)
                  );
                  pointer++;
                }
                pointer++;
              } else if (pointer !== 0 && diffs[pointer - 1][0] == DIFF_EQUAL) {
                diffs[pointer - 1][1] += diffs[pointer][1];
                diffs.splice(pointer, 1);
              } else {
                pointer++;
              }
              count_insert = 0;
              count_delete = 0;
              text_delete = "";
              text_insert = "";
              break;
          }
        }
        if (diffs[diffs.length - 1][1] === "") {
          diffs.pop();
        }
        var changes = false;
        pointer = 1;
        while (pointer < diffs.length - 1) {
          if (diffs[pointer - 1][0] == DIFF_EQUAL && diffs[pointer + 1][0] == DIFF_EQUAL) {
            if (diffs[pointer][1].substring(diffs[pointer][1].length - diffs[pointer - 1][1].length) == diffs[pointer - 1][1]) {
              diffs[pointer][1] = diffs[pointer - 1][1] + diffs[pointer][1].substring(0, diffs[pointer][1].length - diffs[pointer - 1][1].length);
              diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
              diffs.splice(pointer - 1, 1);
              changes = true;
            } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) == diffs[pointer + 1][1]) {
              diffs[pointer - 1][1] += diffs[pointer + 1][1];
              diffs[pointer][1] = diffs[pointer][1].substring(diffs[pointer + 1][1].length) + diffs[pointer + 1][1];
              diffs.splice(pointer + 1, 1);
              changes = true;
            }
          }
          pointer++;
        }
        if (changes) {
          this.diff_cleanupMerge(diffs);
        }
      };
      diff_match_patch.prototype.diff_xIndex = function(diffs, loc2) {
        var chars1 = 0;
        var chars2 = 0;
        var last_chars1 = 0;
        var last_chars2 = 0;
        var x2;
        for (x2 = 0; x2 < diffs.length; x2++) {
          if (diffs[x2][0] !== DIFF_INSERT) {
            chars1 += diffs[x2][1].length;
          }
          if (diffs[x2][0] !== DIFF_DELETE) {
            chars2 += diffs[x2][1].length;
          }
          if (chars1 > loc2) {
            break;
          }
          last_chars1 = chars1;
          last_chars2 = chars2;
        }
        if (diffs.length != x2 && diffs[x2][0] === DIFF_DELETE) {
          return last_chars2;
        }
        return last_chars2 + (loc2 - last_chars1);
      };
      diff_match_patch.prototype.diff_prettyHtml = function(diffs) {
        var html2 = [];
        var pattern_amp = /&/g;
        var pattern_lt = /</g;
        var pattern_gt = />/g;
        var pattern_para = /\n/g;
        for (var x2 = 0; x2 < diffs.length; x2++) {
          var op = diffs[x2][0];
          var data = diffs[x2][1];
          var text2 = data.replace(pattern_amp, "&amp;").replace(pattern_lt, "&lt;").replace(pattern_gt, "&gt;").replace(pattern_para, "&para;<br>");
          switch (op) {
            case DIFF_INSERT:
              html2[x2] = '<ins style="background:#e6ffe6;">' + text2 + "</ins>";
              break;
            case DIFF_DELETE:
              html2[x2] = '<del style="background:#ffe6e6;">' + text2 + "</del>";
              break;
            case DIFF_EQUAL:
              html2[x2] = "<span>" + text2 + "</span>";
              break;
          }
        }
        return html2.join("");
      };
      diff_match_patch.prototype.diff_text1 = function(diffs) {
        var text2 = [];
        for (var x2 = 0; x2 < diffs.length; x2++) {
          if (diffs[x2][0] !== DIFF_INSERT) {
            text2[x2] = diffs[x2][1];
          }
        }
        return text2.join("");
      };
      diff_match_patch.prototype.diff_text2 = function(diffs) {
        var text2 = [];
        for (var x2 = 0; x2 < diffs.length; x2++) {
          if (diffs[x2][0] !== DIFF_DELETE) {
            text2[x2] = diffs[x2][1];
          }
        }
        return text2.join("");
      };
      diff_match_patch.prototype.diff_levenshtein = function(diffs) {
        var levenshtein = 0;
        var insertions = 0;
        var deletions = 0;
        for (var x2 = 0; x2 < diffs.length; x2++) {
          var op = diffs[x2][0];
          var data = diffs[x2][1];
          switch (op) {
            case DIFF_INSERT:
              insertions += data.length;
              break;
            case DIFF_DELETE:
              deletions += data.length;
              break;
            case DIFF_EQUAL:
              levenshtein += Math.max(insertions, deletions);
              insertions = 0;
              deletions = 0;
              break;
          }
        }
        levenshtein += Math.max(insertions, deletions);
        return levenshtein;
      };
      diff_match_patch.prototype.diff_toDelta = function(diffs) {
        var text2 = [];
        for (var x2 = 0; x2 < diffs.length; x2++) {
          switch (diffs[x2][0]) {
            case DIFF_INSERT:
              text2[x2] = "+" + encodeURI(diffs[x2][1]);
              break;
            case DIFF_DELETE:
              text2[x2] = "-" + diffs[x2][1].length;
              break;
            case DIFF_EQUAL:
              text2[x2] = "=" + diffs[x2][1].length;
              break;
          }
        }
        return text2.join("	").replace(/%20/g, " ");
      };
      diff_match_patch.prototype.diff_fromDelta = function(text1, delta) {
        var diffs = [];
        var diffsLength = 0;
        var pointer = 0;
        var tokens = delta.split(/\t/g);
        for (var x2 = 0; x2 < tokens.length; x2++) {
          var param = tokens[x2].substring(1);
          switch (tokens[x2].charAt(0)) {
            case "+":
              try {
                diffs[diffsLength++] = new diff_match_patch.Diff(DIFF_INSERT, decodeURI(param));
              } catch (ex) {
                throw new Error("Illegal escape in diff_fromDelta: " + param);
              }
              break;
            case "-":
            case "=":
              var n2 = parseInt(param, 10);
              if (isNaN(n2) || n2 < 0) {
                throw new Error("Invalid number in diff_fromDelta: " + param);
              }
              var text2 = text1.substring(pointer, pointer += n2);
              if (tokens[x2].charAt(0) == "=") {
                diffs[diffsLength++] = new diff_match_patch.Diff(DIFF_EQUAL, text2);
              } else {
                diffs[diffsLength++] = new diff_match_patch.Diff(DIFF_DELETE, text2);
              }
              break;
            default:
              if (tokens[x2]) {
                throw new Error("Invalid diff operation in diff_fromDelta: " + tokens[x2]);
              }
          }
        }
        if (pointer != text1.length) {
          throw new Error("Delta length (" + pointer + ") does not equal source text length (" + text1.length + ").");
        }
        return diffs;
      };
      diff_match_patch.prototype.match_main = function(text2, pattern, loc2) {
        if (text2 == null || pattern == null || loc2 == null) {
          throw new Error("Null input. (match_main)");
        }
        loc2 = Math.max(0, Math.min(loc2, text2.length));
        if (text2 == pattern) {
          return 0;
        } else if (!text2.length) {
          return -1;
        } else if (text2.substring(loc2, loc2 + pattern.length) == pattern) {
          return loc2;
        } else {
          return this.match_bitap_(text2, pattern, loc2);
        }
      };
      diff_match_patch.prototype.match_bitap_ = function(text2, pattern, loc2) {
        if (pattern.length > this.Match_MaxBits) {
          throw new Error("Pattern too long for this browser.");
        }
        var s2 = this.match_alphabet_(pattern);
        var dmp = this;
        function match_bitapScore_(e2, x2) {
          var accuracy = e2 / pattern.length;
          var proximity = Math.abs(loc2 - x2);
          if (!dmp.Match_Distance) {
            return proximity ? 1 : accuracy;
          }
          return accuracy + proximity / dmp.Match_Distance;
        }
        var score_threshold = this.Match_Threshold;
        var best_loc = text2.indexOf(pattern, loc2);
        if (best_loc != -1) {
          score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
          best_loc = text2.lastIndexOf(pattern, loc2 + pattern.length);
          if (best_loc != -1) {
            score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
          }
        }
        var matchmask = 1 << pattern.length - 1;
        best_loc = -1;
        var bin_min, bin_mid;
        var bin_max = pattern.length + text2.length;
        var last_rd;
        for (var d2 = 0; d2 < pattern.length; d2++) {
          bin_min = 0;
          bin_mid = bin_max;
          while (bin_min < bin_mid) {
            if (match_bitapScore_(d2, loc2 + bin_mid) <= score_threshold) {
              bin_min = bin_mid;
            } else {
              bin_max = bin_mid;
            }
            bin_mid = Math.floor((bin_max - bin_min) / 2 + bin_min);
          }
          bin_max = bin_mid;
          var start = Math.max(1, loc2 - bin_mid + 1);
          var finish = Math.min(loc2 + bin_mid, text2.length) + pattern.length;
          var rd = Array(finish + 2);
          rd[finish + 1] = (1 << d2) - 1;
          for (var j2 = finish; j2 >= start; j2--) {
            var charMatch = s2[text2.charAt(j2 - 1)];
            if (d2 === 0) {
              rd[j2] = (rd[j2 + 1] << 1 | 1) & charMatch;
            } else {
              rd[j2] = (rd[j2 + 1] << 1 | 1) & charMatch | ((last_rd[j2 + 1] | last_rd[j2]) << 1 | 1) | last_rd[j2 + 1];
            }
            if (rd[j2] & matchmask) {
              var score = match_bitapScore_(d2, j2 - 1);
              if (score <= score_threshold) {
                score_threshold = score;
                best_loc = j2 - 1;
                if (best_loc > loc2) {
                  start = Math.max(1, 2 * loc2 - best_loc);
                } else {
                  break;
                }
              }
            }
          }
          if (match_bitapScore_(d2 + 1, loc2) > score_threshold) {
            break;
          }
          last_rd = rd;
        }
        return best_loc;
      };
      diff_match_patch.prototype.match_alphabet_ = function(pattern) {
        var s2 = {};
        for (var i2 = 0; i2 < pattern.length; i2++) {
          s2[pattern.charAt(i2)] = 0;
        }
        for (var i2 = 0; i2 < pattern.length; i2++) {
          s2[pattern.charAt(i2)] |= 1 << pattern.length - i2 - 1;
        }
        return s2;
      };
      diff_match_patch.prototype.patch_addContext_ = function(patch, text2) {
        if (text2.length == 0) {
          return;
        }
        if (patch.start2 === null) {
          throw Error("patch not initialized");
        }
        var pattern = text2.substring(patch.start2, patch.start2 + patch.length1);
        var padding = 0;
        while (text2.indexOf(pattern) != text2.lastIndexOf(pattern) && pattern.length < this.Match_MaxBits - this.Patch_Margin - this.Patch_Margin) {
          padding += this.Patch_Margin;
          pattern = text2.substring(
            patch.start2 - padding,
            patch.start2 + patch.length1 + padding
          );
        }
        padding += this.Patch_Margin;
        var prefix = text2.substring(patch.start2 - padding, patch.start2);
        if (prefix) {
          patch.diffs.unshift(new diff_match_patch.Diff(DIFF_EQUAL, prefix));
        }
        var suffix = text2.substring(
          patch.start2 + patch.length1,
          patch.start2 + patch.length1 + padding
        );
        if (suffix) {
          patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, suffix));
        }
        patch.start1 -= prefix.length;
        patch.start2 -= prefix.length;
        patch.length1 += prefix.length + suffix.length;
        patch.length2 += prefix.length + suffix.length;
      };
      diff_match_patch.prototype.patch_make = function(a2, opt_b, opt_c) {
        var text1, diffs;
        if (typeof a2 == "string" && typeof opt_b == "string" && typeof opt_c == "undefined") {
          text1 = /** @type {string} */
          a2;
          diffs = this.diff_main(
            text1,
            /** @type {string} */
            opt_b,
            true
          );
          if (diffs.length > 2) {
            this.diff_cleanupSemantic(diffs);
            this.diff_cleanupEfficiency(diffs);
          }
        } else if (a2 && typeof a2 == "object" && typeof opt_b == "undefined" && typeof opt_c == "undefined") {
          diffs = /** @type {!Array.<!diff_match_patch.Diff>} */
          a2;
          text1 = this.diff_text1(diffs);
        } else if (typeof a2 == "string" && opt_b && typeof opt_b == "object" && typeof opt_c == "undefined") {
          text1 = /** @type {string} */
          a2;
          diffs = /** @type {!Array.<!diff_match_patch.Diff>} */
          opt_b;
        } else if (typeof a2 == "string" && typeof opt_b == "string" && opt_c && typeof opt_c == "object") {
          text1 = /** @type {string} */
          a2;
          diffs = /** @type {!Array.<!diff_match_patch.Diff>} */
          opt_c;
        } else {
          throw new Error("Unknown call format to patch_make.");
        }
        if (diffs.length === 0) {
          return [];
        }
        var patches = [];
        var patch = new diff_match_patch.patch_obj();
        var patchDiffLength = 0;
        var char_count1 = 0;
        var char_count2 = 0;
        var prepatch_text = text1;
        var postpatch_text = text1;
        for (var x2 = 0; x2 < diffs.length; x2++) {
          var diff_type = diffs[x2][0];
          var diff_text = diffs[x2][1];
          if (!patchDiffLength && diff_type !== DIFF_EQUAL) {
            patch.start1 = char_count1;
            patch.start2 = char_count2;
          }
          switch (diff_type) {
            case DIFF_INSERT:
              patch.diffs[patchDiffLength++] = diffs[x2];
              patch.length2 += diff_text.length;
              postpatch_text = postpatch_text.substring(0, char_count2) + diff_text + postpatch_text.substring(char_count2);
              break;
            case DIFF_DELETE:
              patch.length1 += diff_text.length;
              patch.diffs[patchDiffLength++] = diffs[x2];
              postpatch_text = postpatch_text.substring(0, char_count2) + postpatch_text.substring(char_count2 + diff_text.length);
              break;
            case DIFF_EQUAL:
              if (diff_text.length <= 2 * this.Patch_Margin && patchDiffLength && diffs.length != x2 + 1) {
                patch.diffs[patchDiffLength++] = diffs[x2];
                patch.length1 += diff_text.length;
                patch.length2 += diff_text.length;
              } else if (diff_text.length >= 2 * this.Patch_Margin) {
                if (patchDiffLength) {
                  this.patch_addContext_(patch, prepatch_text);
                  patches.push(patch);
                  patch = new diff_match_patch.patch_obj();
                  patchDiffLength = 0;
                  prepatch_text = postpatch_text;
                  char_count1 = char_count2;
                }
              }
              break;
          }
          if (diff_type !== DIFF_INSERT) {
            char_count1 += diff_text.length;
          }
          if (diff_type !== DIFF_DELETE) {
            char_count2 += diff_text.length;
          }
        }
        if (patchDiffLength) {
          this.patch_addContext_(patch, prepatch_text);
          patches.push(patch);
        }
        return patches;
      };
      diff_match_patch.prototype.patch_deepCopy = function(patches) {
        var patchesCopy = [];
        for (var x2 = 0; x2 < patches.length; x2++) {
          var patch = patches[x2];
          var patchCopy = new diff_match_patch.patch_obj();
          patchCopy.diffs = [];
          for (var y2 = 0; y2 < patch.diffs.length; y2++) {
            patchCopy.diffs[y2] = new diff_match_patch.Diff(patch.diffs[y2][0], patch.diffs[y2][1]);
          }
          patchCopy.start1 = patch.start1;
          patchCopy.start2 = patch.start2;
          patchCopy.length1 = patch.length1;
          patchCopy.length2 = patch.length2;
          patchesCopy[x2] = patchCopy;
        }
        return patchesCopy;
      };
      diff_match_patch.prototype.patch_apply = function(patches, text2) {
        if (patches.length == 0) {
          return [text2, []];
        }
        patches = this.patch_deepCopy(patches);
        var nullPadding = this.patch_addPadding(patches);
        text2 = nullPadding + text2 + nullPadding;
        this.patch_splitMax(patches);
        var delta = 0;
        var results = [];
        for (var x2 = 0; x2 < patches.length; x2++) {
          var expected_loc = patches[x2].start2 + delta;
          var text1 = this.diff_text1(patches[x2].diffs);
          var start_loc;
          var end_loc = -1;
          if (text1.length > this.Match_MaxBits) {
            start_loc = this.match_main(
              text2,
              text1.substring(0, this.Match_MaxBits),
              expected_loc
            );
            if (start_loc != -1) {
              end_loc = this.match_main(
                text2,
                text1.substring(text1.length - this.Match_MaxBits),
                expected_loc + text1.length - this.Match_MaxBits
              );
              if (end_loc == -1 || start_loc >= end_loc) {
                start_loc = -1;
              }
            }
          } else {
            start_loc = this.match_main(text2, text1, expected_loc);
          }
          if (start_loc == -1) {
            results[x2] = false;
            delta -= patches[x2].length2 - patches[x2].length1;
          } else {
            results[x2] = true;
            delta = start_loc - expected_loc;
            var text22;
            if (end_loc == -1) {
              text22 = text2.substring(start_loc, start_loc + text1.length);
            } else {
              text22 = text2.substring(start_loc, end_loc + this.Match_MaxBits);
            }
            if (text1 == text22) {
              text2 = text2.substring(0, start_loc) + this.diff_text2(patches[x2].diffs) + text2.substring(start_loc + text1.length);
            } else {
              var diffs = this.diff_main(text1, text22, false);
              if (text1.length > this.Match_MaxBits && this.diff_levenshtein(diffs) / text1.length > this.Patch_DeleteThreshold) {
                results[x2] = false;
              } else {
                this.diff_cleanupSemanticLossless(diffs);
                var index1 = 0;
                var index2;
                for (var y2 = 0; y2 < patches[x2].diffs.length; y2++) {
                  var mod = patches[x2].diffs[y2];
                  if (mod[0] !== DIFF_EQUAL) {
                    index2 = this.diff_xIndex(diffs, index1);
                  }
                  if (mod[0] === DIFF_INSERT) {
                    text2 = text2.substring(0, start_loc + index2) + mod[1] + text2.substring(start_loc + index2);
                  } else if (mod[0] === DIFF_DELETE) {
                    text2 = text2.substring(0, start_loc + index2) + text2.substring(start_loc + this.diff_xIndex(
                      diffs,
                      index1 + mod[1].length
                    ));
                  }
                  if (mod[0] !== DIFF_DELETE) {
                    index1 += mod[1].length;
                  }
                }
              }
            }
          }
        }
        text2 = text2.substring(nullPadding.length, text2.length - nullPadding.length);
        return [text2, results];
      };
      diff_match_patch.prototype.patch_addPadding = function(patches) {
        var paddingLength = this.Patch_Margin;
        var nullPadding = "";
        for (var x2 = 1; x2 <= paddingLength; x2++) {
          nullPadding += String.fromCharCode(x2);
        }
        for (var x2 = 0; x2 < patches.length; x2++) {
          patches[x2].start1 += paddingLength;
          patches[x2].start2 += paddingLength;
        }
        var patch = patches[0];
        var diffs = patch.diffs;
        if (diffs.length == 0 || diffs[0][0] != DIFF_EQUAL) {
          diffs.unshift(new diff_match_patch.Diff(DIFF_EQUAL, nullPadding));
          patch.start1 -= paddingLength;
          patch.start2 -= paddingLength;
          patch.length1 += paddingLength;
          patch.length2 += paddingLength;
        } else if (paddingLength > diffs[0][1].length) {
          var extraLength = paddingLength - diffs[0][1].length;
          diffs[0][1] = nullPadding.substring(diffs[0][1].length) + diffs[0][1];
          patch.start1 -= extraLength;
          patch.start2 -= extraLength;
          patch.length1 += extraLength;
          patch.length2 += extraLength;
        }
        patch = patches[patches.length - 1];
        diffs = patch.diffs;
        if (diffs.length == 0 || diffs[diffs.length - 1][0] != DIFF_EQUAL) {
          diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, nullPadding));
          patch.length1 += paddingLength;
          patch.length2 += paddingLength;
        } else if (paddingLength > diffs[diffs.length - 1][1].length) {
          var extraLength = paddingLength - diffs[diffs.length - 1][1].length;
          diffs[diffs.length - 1][1] += nullPadding.substring(0, extraLength);
          patch.length1 += extraLength;
          patch.length2 += extraLength;
        }
        return nullPadding;
      };
      diff_match_patch.prototype.patch_splitMax = function(patches) {
        var patch_size = this.Match_MaxBits;
        for (var x2 = 0; x2 < patches.length; x2++) {
          if (patches[x2].length1 <= patch_size) {
            continue;
          }
          var bigpatch = patches[x2];
          patches.splice(x2--, 1);
          var start1 = bigpatch.start1;
          var start2 = bigpatch.start2;
          var precontext = "";
          while (bigpatch.diffs.length !== 0) {
            var patch = new diff_match_patch.patch_obj();
            var empty2 = true;
            patch.start1 = start1 - precontext.length;
            patch.start2 = start2 - precontext.length;
            if (precontext !== "") {
              patch.length1 = patch.length2 = precontext.length;
              patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, precontext));
            }
            while (bigpatch.diffs.length !== 0 && patch.length1 < patch_size - this.Patch_Margin) {
              var diff_type = bigpatch.diffs[0][0];
              var diff_text = bigpatch.diffs[0][1];
              if (diff_type === DIFF_INSERT) {
                patch.length2 += diff_text.length;
                start2 += diff_text.length;
                patch.diffs.push(bigpatch.diffs.shift());
                empty2 = false;
              } else if (diff_type === DIFF_DELETE && patch.diffs.length == 1 && patch.diffs[0][0] == DIFF_EQUAL && diff_text.length > 2 * patch_size) {
                patch.length1 += diff_text.length;
                start1 += diff_text.length;
                empty2 = false;
                patch.diffs.push(new diff_match_patch.Diff(diff_type, diff_text));
                bigpatch.diffs.shift();
              } else {
                diff_text = diff_text.substring(
                  0,
                  patch_size - patch.length1 - this.Patch_Margin
                );
                patch.length1 += diff_text.length;
                start1 += diff_text.length;
                if (diff_type === DIFF_EQUAL) {
                  patch.length2 += diff_text.length;
                  start2 += diff_text.length;
                } else {
                  empty2 = false;
                }
                patch.diffs.push(new diff_match_patch.Diff(diff_type, diff_text));
                if (diff_text == bigpatch.diffs[0][1]) {
                  bigpatch.diffs.shift();
                } else {
                  bigpatch.diffs[0][1] = bigpatch.diffs[0][1].substring(diff_text.length);
                }
              }
            }
            precontext = this.diff_text2(patch.diffs);
            precontext = precontext.substring(precontext.length - this.Patch_Margin);
            var postcontext = this.diff_text1(bigpatch.diffs).substring(0, this.Patch_Margin);
            if (postcontext !== "") {
              patch.length1 += postcontext.length;
              patch.length2 += postcontext.length;
              if (patch.diffs.length !== 0 && patch.diffs[patch.diffs.length - 1][0] === DIFF_EQUAL) {
                patch.diffs[patch.diffs.length - 1][1] += postcontext;
              } else {
                patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, postcontext));
              }
            }
            if (!empty2) {
              patches.splice(++x2, 0, patch);
            }
          }
        }
      };
      diff_match_patch.prototype.patch_toText = function(patches) {
        var text2 = [];
        for (var x2 = 0; x2 < patches.length; x2++) {
          text2[x2] = patches[x2];
        }
        return text2.join("");
      };
      diff_match_patch.prototype.patch_fromText = function(textline) {
        var patches = [];
        if (!textline) {
          return patches;
        }
        var text2 = textline.split("\n");
        var textPointer = 0;
        var patchHeader = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;
        while (textPointer < text2.length) {
          var m2 = text2[textPointer].match(patchHeader);
          if (!m2) {
            throw new Error("Invalid patch string: " + text2[textPointer]);
          }
          var patch = new diff_match_patch.patch_obj();
          patches.push(patch);
          patch.start1 = parseInt(m2[1], 10);
          if (m2[2] === "") {
            patch.start1--;
            patch.length1 = 1;
          } else if (m2[2] == "0") {
            patch.length1 = 0;
          } else {
            patch.start1--;
            patch.length1 = parseInt(m2[2], 10);
          }
          patch.start2 = parseInt(m2[3], 10);
          if (m2[4] === "") {
            patch.start2--;
            patch.length2 = 1;
          } else if (m2[4] == "0") {
            patch.length2 = 0;
          } else {
            patch.start2--;
            patch.length2 = parseInt(m2[4], 10);
          }
          textPointer++;
          while (textPointer < text2.length) {
            var sign = text2[textPointer].charAt(0);
            try {
              var line = decodeURI(text2[textPointer].substring(1));
            } catch (ex) {
              throw new Error("Illegal escape in patch_fromText: " + line);
            }
            if (sign == "-") {
              patch.diffs.push(new diff_match_patch.Diff(DIFF_DELETE, line));
            } else if (sign == "+") {
              patch.diffs.push(new diff_match_patch.Diff(DIFF_INSERT, line));
            } else if (sign == " ") {
              patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, line));
            } else if (sign == "@") {
              break;
            } else if (sign === "")
              ;
            else {
              throw new Error('Invalid patch mode "' + sign + '" in: ' + line);
            }
            textPointer++;
          }
        }
        return patches;
      };
      diff_match_patch.patch_obj = function() {
        this.diffs = [];
        this.start1 = null;
        this.start2 = null;
        this.length1 = 0;
        this.length2 = 0;
      };
      diff_match_patch.patch_obj.prototype.toString = function() {
        var coords1, coords2;
        if (this.length1 === 0) {
          coords1 = this.start1 + ",0";
        } else if (this.length1 == 1) {
          coords1 = this.start1 + 1;
        } else {
          coords1 = this.start1 + 1 + "," + this.length1;
        }
        if (this.length2 === 0) {
          coords2 = this.start2 + ",0";
        } else if (this.length2 == 1) {
          coords2 = this.start2 + 1;
        } else {
          coords2 = this.start2 + 1 + "," + this.length2;
        }
        var text2 = ["@@ -" + coords1 + " +" + coords2 + " @@\n"];
        var op;
        for (var x2 = 0; x2 < this.diffs.length; x2++) {
          switch (this.diffs[x2][0]) {
            case DIFF_INSERT:
              op = "+";
              break;
            case DIFF_DELETE:
              op = "-";
              break;
            case DIFF_EQUAL:
              op = " ";
              break;
          }
          text2[x2 + 1] = op + encodeURI(this.diffs[x2][1]) + "\n";
        }
        return text2.join("").replace(/%20/g, " ");
      };
      module2.exports = diff_match_patch;
      module2.exports["diff_match_patch"] = diff_match_patch;
      module2.exports["DIFF_DELETE"] = DIFF_DELETE;
      module2.exports["DIFF_INSERT"] = DIFF_INSERT;
      module2.exports["DIFF_EQUAL"] = DIFF_EQUAL;
    })(diffMatchPatch);
    var ansiStyles$1 = { exports: {} };
    var colorName;
    var hasRequiredColorName;
    function requireColorName() {
      if (hasRequiredColorName)
        return colorName;
      hasRequiredColorName = 1;
      colorName = {
        "aliceblue": [240, 248, 255],
        "antiquewhite": [250, 235, 215],
        "aqua": [0, 255, 255],
        "aquamarine": [127, 255, 212],
        "azure": [240, 255, 255],
        "beige": [245, 245, 220],
        "bisque": [255, 228, 196],
        "black": [0, 0, 0],
        "blanchedalmond": [255, 235, 205],
        "blue": [0, 0, 255],
        "blueviolet": [138, 43, 226],
        "brown": [165, 42, 42],
        "burlywood": [222, 184, 135],
        "cadetblue": [95, 158, 160],
        "chartreuse": [127, 255, 0],
        "chocolate": [210, 105, 30],
        "coral": [255, 127, 80],
        "cornflowerblue": [100, 149, 237],
        "cornsilk": [255, 248, 220],
        "crimson": [220, 20, 60],
        "cyan": [0, 255, 255],
        "darkblue": [0, 0, 139],
        "darkcyan": [0, 139, 139],
        "darkgoldenrod": [184, 134, 11],
        "darkgray": [169, 169, 169],
        "darkgreen": [0, 100, 0],
        "darkgrey": [169, 169, 169],
        "darkkhaki": [189, 183, 107],
        "darkmagenta": [139, 0, 139],
        "darkolivegreen": [85, 107, 47],
        "darkorange": [255, 140, 0],
        "darkorchid": [153, 50, 204],
        "darkred": [139, 0, 0],
        "darksalmon": [233, 150, 122],
        "darkseagreen": [143, 188, 143],
        "darkslateblue": [72, 61, 139],
        "darkslategray": [47, 79, 79],
        "darkslategrey": [47, 79, 79],
        "darkturquoise": [0, 206, 209],
        "darkviolet": [148, 0, 211],
        "deeppink": [255, 20, 147],
        "deepskyblue": [0, 191, 255],
        "dimgray": [105, 105, 105],
        "dimgrey": [105, 105, 105],
        "dodgerblue": [30, 144, 255],
        "firebrick": [178, 34, 34],
        "floralwhite": [255, 250, 240],
        "forestgreen": [34, 139, 34],
        "fuchsia": [255, 0, 255],
        "gainsboro": [220, 220, 220],
        "ghostwhite": [248, 248, 255],
        "gold": [255, 215, 0],
        "goldenrod": [218, 165, 32],
        "gray": [128, 128, 128],
        "green": [0, 128, 0],
        "greenyellow": [173, 255, 47],
        "grey": [128, 128, 128],
        "honeydew": [240, 255, 240],
        "hotpink": [255, 105, 180],
        "indianred": [205, 92, 92],
        "indigo": [75, 0, 130],
        "ivory": [255, 255, 240],
        "khaki": [240, 230, 140],
        "lavender": [230, 230, 250],
        "lavenderblush": [255, 240, 245],
        "lawngreen": [124, 252, 0],
        "lemonchiffon": [255, 250, 205],
        "lightblue": [173, 216, 230],
        "lightcoral": [240, 128, 128],
        "lightcyan": [224, 255, 255],
        "lightgoldenrodyellow": [250, 250, 210],
        "lightgray": [211, 211, 211],
        "lightgreen": [144, 238, 144],
        "lightgrey": [211, 211, 211],
        "lightpink": [255, 182, 193],
        "lightsalmon": [255, 160, 122],
        "lightseagreen": [32, 178, 170],
        "lightskyblue": [135, 206, 250],
        "lightslategray": [119, 136, 153],
        "lightslategrey": [119, 136, 153],
        "lightsteelblue": [176, 196, 222],
        "lightyellow": [255, 255, 224],
        "lime": [0, 255, 0],
        "limegreen": [50, 205, 50],
        "linen": [250, 240, 230],
        "magenta": [255, 0, 255],
        "maroon": [128, 0, 0],
        "mediumaquamarine": [102, 205, 170],
        "mediumblue": [0, 0, 205],
        "mediumorchid": [186, 85, 211],
        "mediumpurple": [147, 112, 219],
        "mediumseagreen": [60, 179, 113],
        "mediumslateblue": [123, 104, 238],
        "mediumspringgreen": [0, 250, 154],
        "mediumturquoise": [72, 209, 204],
        "mediumvioletred": [199, 21, 133],
        "midnightblue": [25, 25, 112],
        "mintcream": [245, 255, 250],
        "mistyrose": [255, 228, 225],
        "moccasin": [255, 228, 181],
        "navajowhite": [255, 222, 173],
        "navy": [0, 0, 128],
        "oldlace": [253, 245, 230],
        "olive": [128, 128, 0],
        "olivedrab": [107, 142, 35],
        "orange": [255, 165, 0],
        "orangered": [255, 69, 0],
        "orchid": [218, 112, 214],
        "palegoldenrod": [238, 232, 170],
        "palegreen": [152, 251, 152],
        "paleturquoise": [175, 238, 238],
        "palevioletred": [219, 112, 147],
        "papayawhip": [255, 239, 213],
        "peachpuff": [255, 218, 185],
        "peru": [205, 133, 63],
        "pink": [255, 192, 203],
        "plum": [221, 160, 221],
        "powderblue": [176, 224, 230],
        "purple": [128, 0, 128],
        "rebeccapurple": [102, 51, 153],
        "red": [255, 0, 0],
        "rosybrown": [188, 143, 143],
        "royalblue": [65, 105, 225],
        "saddlebrown": [139, 69, 19],
        "salmon": [250, 128, 114],
        "sandybrown": [244, 164, 96],
        "seagreen": [46, 139, 87],
        "seashell": [255, 245, 238],
        "sienna": [160, 82, 45],
        "silver": [192, 192, 192],
        "skyblue": [135, 206, 235],
        "slateblue": [106, 90, 205],
        "slategray": [112, 128, 144],
        "slategrey": [112, 128, 144],
        "snow": [255, 250, 250],
        "springgreen": [0, 255, 127],
        "steelblue": [70, 130, 180],
        "tan": [210, 180, 140],
        "teal": [0, 128, 128],
        "thistle": [216, 191, 216],
        "tomato": [255, 99, 71],
        "turquoise": [64, 224, 208],
        "violet": [238, 130, 238],
        "wheat": [245, 222, 179],
        "white": [255, 255, 255],
        "whitesmoke": [245, 245, 245],
        "yellow": [255, 255, 0],
        "yellowgreen": [154, 205, 50]
      };
      return colorName;
    }
    var conversions;
    var hasRequiredConversions;
    function requireConversions() {
      if (hasRequiredConversions)
        return conversions;
      hasRequiredConversions = 1;
      const cssKeywords = requireColorName();
      const reverseKeywords = {};
      for (const key of Object.keys(cssKeywords)) {
        reverseKeywords[cssKeywords[key]] = key;
      }
      const convert = {
        rgb: { channels: 3, labels: "rgb" },
        hsl: { channels: 3, labels: "hsl" },
        hsv: { channels: 3, labels: "hsv" },
        hwb: { channels: 3, labels: "hwb" },
        cmyk: { channels: 4, labels: "cmyk" },
        xyz: { channels: 3, labels: "xyz" },
        lab: { channels: 3, labels: "lab" },
        lch: { channels: 3, labels: "lch" },
        hex: { channels: 1, labels: ["hex"] },
        keyword: { channels: 1, labels: ["keyword"] },
        ansi16: { channels: 1, labels: ["ansi16"] },
        ansi256: { channels: 1, labels: ["ansi256"] },
        hcg: { channels: 3, labels: ["h", "c", "g"] },
        apple: { channels: 3, labels: ["r16", "g16", "b16"] },
        gray: { channels: 1, labels: ["gray"] }
      };
      conversions = convert;
      for (const model of Object.keys(convert)) {
        if (!("channels" in convert[model])) {
          throw new Error("missing channels property: " + model);
        }
        if (!("labels" in convert[model])) {
          throw new Error("missing channel labels property: " + model);
        }
        if (convert[model].labels.length !== convert[model].channels) {
          throw new Error("channel and label counts mismatch: " + model);
        }
        const { channels, labels } = convert[model];
        delete convert[model].channels;
        delete convert[model].labels;
        Object.defineProperty(convert[model], "channels", { value: channels });
        Object.defineProperty(convert[model], "labels", { value: labels });
      }
      convert.rgb.hsl = function(rgb) {
        const r2 = rgb[0] / 255;
        const g2 = rgb[1] / 255;
        const b2 = rgb[2] / 255;
        const min = Math.min(r2, g2, b2);
        const max = Math.max(r2, g2, b2);
        const delta = max - min;
        let h2;
        let s2;
        if (max === min) {
          h2 = 0;
        } else if (r2 === max) {
          h2 = (g2 - b2) / delta;
        } else if (g2 === max) {
          h2 = 2 + (b2 - r2) / delta;
        } else if (b2 === max) {
          h2 = 4 + (r2 - g2) / delta;
        }
        h2 = Math.min(h2 * 60, 360);
        if (h2 < 0) {
          h2 += 360;
        }
        const l2 = (min + max) / 2;
        if (max === min) {
          s2 = 0;
        } else if (l2 <= 0.5) {
          s2 = delta / (max + min);
        } else {
          s2 = delta / (2 - max - min);
        }
        return [h2, s2 * 100, l2 * 100];
      };
      convert.rgb.hsv = function(rgb) {
        let rdif;
        let gdif;
        let bdif;
        let h2;
        let s2;
        const r2 = rgb[0] / 255;
        const g2 = rgb[1] / 255;
        const b2 = rgb[2] / 255;
        const v2 = Math.max(r2, g2, b2);
        const diff = v2 - Math.min(r2, g2, b2);
        const diffc = function(c2) {
          return (v2 - c2) / 6 / diff + 1 / 2;
        };
        if (diff === 0) {
          h2 = 0;
          s2 = 0;
        } else {
          s2 = diff / v2;
          rdif = diffc(r2);
          gdif = diffc(g2);
          bdif = diffc(b2);
          if (r2 === v2) {
            h2 = bdif - gdif;
          } else if (g2 === v2) {
            h2 = 1 / 3 + rdif - bdif;
          } else if (b2 === v2) {
            h2 = 2 / 3 + gdif - rdif;
          }
          if (h2 < 0) {
            h2 += 1;
          } else if (h2 > 1) {
            h2 -= 1;
          }
        }
        return [
          h2 * 360,
          s2 * 100,
          v2 * 100
        ];
      };
      convert.rgb.hwb = function(rgb) {
        const r2 = rgb[0];
        const g2 = rgb[1];
        let b2 = rgb[2];
        const h2 = convert.rgb.hsl(rgb)[0];
        const w2 = 1 / 255 * Math.min(r2, Math.min(g2, b2));
        b2 = 1 - 1 / 255 * Math.max(r2, Math.max(g2, b2));
        return [h2, w2 * 100, b2 * 100];
      };
      convert.rgb.cmyk = function(rgb) {
        const r2 = rgb[0] / 255;
        const g2 = rgb[1] / 255;
        const b2 = rgb[2] / 255;
        const k2 = Math.min(1 - r2, 1 - g2, 1 - b2);
        const c2 = (1 - r2 - k2) / (1 - k2) || 0;
        const m2 = (1 - g2 - k2) / (1 - k2) || 0;
        const y2 = (1 - b2 - k2) / (1 - k2) || 0;
        return [c2 * 100, m2 * 100, y2 * 100, k2 * 100];
      };
      function comparativeDistance(x2, y2) {
        return __pow(x2[0] - y2[0], 2) + __pow(x2[1] - y2[1], 2) + __pow(x2[2] - y2[2], 2);
      }
      convert.rgb.keyword = function(rgb) {
        const reversed = reverseKeywords[rgb];
        if (reversed) {
          return reversed;
        }
        let currentClosestDistance = Infinity;
        let currentClosestKeyword;
        for (const keyword of Object.keys(cssKeywords)) {
          const value = cssKeywords[keyword];
          const distance = comparativeDistance(rgb, value);
          if (distance < currentClosestDistance) {
            currentClosestDistance = distance;
            currentClosestKeyword = keyword;
          }
        }
        return currentClosestKeyword;
      };
      convert.keyword.rgb = function(keyword) {
        return cssKeywords[keyword];
      };
      convert.rgb.xyz = function(rgb) {
        let r2 = rgb[0] / 255;
        let g2 = rgb[1] / 255;
        let b2 = rgb[2] / 255;
        r2 = r2 > 0.04045 ? __pow((r2 + 0.055) / 1.055, 2.4) : r2 / 12.92;
        g2 = g2 > 0.04045 ? __pow((g2 + 0.055) / 1.055, 2.4) : g2 / 12.92;
        b2 = b2 > 0.04045 ? __pow((b2 + 0.055) / 1.055, 2.4) : b2 / 12.92;
        const x2 = r2 * 0.4124 + g2 * 0.3576 + b2 * 0.1805;
        const y2 = r2 * 0.2126 + g2 * 0.7152 + b2 * 0.0722;
        const z = r2 * 0.0193 + g2 * 0.1192 + b2 * 0.9505;
        return [x2 * 100, y2 * 100, z * 100];
      };
      convert.rgb.lab = function(rgb) {
        const xyz = convert.rgb.xyz(rgb);
        let x2 = xyz[0];
        let y2 = xyz[1];
        let z = xyz[2];
        x2 /= 95.047;
        y2 /= 100;
        z /= 108.883;
        x2 = x2 > 8856e-6 ? __pow(x2, 1 / 3) : 7.787 * x2 + 16 / 116;
        y2 = y2 > 8856e-6 ? __pow(y2, 1 / 3) : 7.787 * y2 + 16 / 116;
        z = z > 8856e-6 ? __pow(z, 1 / 3) : 7.787 * z + 16 / 116;
        const l2 = 116 * y2 - 16;
        const a2 = 500 * (x2 - y2);
        const b2 = 200 * (y2 - z);
        return [l2, a2, b2];
      };
      convert.hsl.rgb = function(hsl) {
        const h2 = hsl[0] / 360;
        const s2 = hsl[1] / 100;
        const l2 = hsl[2] / 100;
        let t2;
        let t3;
        let val;
        if (s2 === 0) {
          val = l2 * 255;
          return [val, val, val];
        }
        if (l2 < 0.5) {
          t2 = l2 * (1 + s2);
        } else {
          t2 = l2 + s2 - l2 * s2;
        }
        const t1 = 2 * l2 - t2;
        const rgb = [0, 0, 0];
        for (let i2 = 0; i2 < 3; i2++) {
          t3 = h2 + 1 / 3 * -(i2 - 1);
          if (t3 < 0) {
            t3++;
          }
          if (t3 > 1) {
            t3--;
          }
          if (6 * t3 < 1) {
            val = t1 + (t2 - t1) * 6 * t3;
          } else if (2 * t3 < 1) {
            val = t2;
          } else if (3 * t3 < 2) {
            val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
          } else {
            val = t1;
          }
          rgb[i2] = val * 255;
        }
        return rgb;
      };
      convert.hsl.hsv = function(hsl) {
        const h2 = hsl[0];
        let s2 = hsl[1] / 100;
        let l2 = hsl[2] / 100;
        let smin = s2;
        const lmin = Math.max(l2, 0.01);
        l2 *= 2;
        s2 *= l2 <= 1 ? l2 : 2 - l2;
        smin *= lmin <= 1 ? lmin : 2 - lmin;
        const v2 = (l2 + s2) / 2;
        const sv = l2 === 0 ? 2 * smin / (lmin + smin) : 2 * s2 / (l2 + s2);
        return [h2, sv * 100, v2 * 100];
      };
      convert.hsv.rgb = function(hsv) {
        const h2 = hsv[0] / 60;
        const s2 = hsv[1] / 100;
        let v2 = hsv[2] / 100;
        const hi = Math.floor(h2) % 6;
        const f2 = h2 - Math.floor(h2);
        const p2 = 255 * v2 * (1 - s2);
        const q = 255 * v2 * (1 - s2 * f2);
        const t2 = 255 * v2 * (1 - s2 * (1 - f2));
        v2 *= 255;
        switch (hi) {
          case 0:
            return [v2, t2, p2];
          case 1:
            return [q, v2, p2];
          case 2:
            return [p2, v2, t2];
          case 3:
            return [p2, q, v2];
          case 4:
            return [t2, p2, v2];
          case 5:
            return [v2, p2, q];
        }
      };
      convert.hsv.hsl = function(hsv) {
        const h2 = hsv[0];
        const s2 = hsv[1] / 100;
        const v2 = hsv[2] / 100;
        const vmin = Math.max(v2, 0.01);
        let sl;
        let l2;
        l2 = (2 - s2) * v2;
        const lmin = (2 - s2) * vmin;
        sl = s2 * vmin;
        sl /= lmin <= 1 ? lmin : 2 - lmin;
        sl = sl || 0;
        l2 /= 2;
        return [h2, sl * 100, l2 * 100];
      };
      convert.hwb.rgb = function(hwb) {
        const h2 = hwb[0] / 360;
        let wh = hwb[1] / 100;
        let bl = hwb[2] / 100;
        const ratio = wh + bl;
        let f2;
        if (ratio > 1) {
          wh /= ratio;
          bl /= ratio;
        }
        const i2 = Math.floor(6 * h2);
        const v2 = 1 - bl;
        f2 = 6 * h2 - i2;
        if ((i2 & 1) !== 0) {
          f2 = 1 - f2;
        }
        const n2 = wh + f2 * (v2 - wh);
        let r2;
        let g2;
        let b2;
        switch (i2) {
          default:
          case 6:
          case 0:
            r2 = v2;
            g2 = n2;
            b2 = wh;
            break;
          case 1:
            r2 = n2;
            g2 = v2;
            b2 = wh;
            break;
          case 2:
            r2 = wh;
            g2 = v2;
            b2 = n2;
            break;
          case 3:
            r2 = wh;
            g2 = n2;
            b2 = v2;
            break;
          case 4:
            r2 = n2;
            g2 = wh;
            b2 = v2;
            break;
          case 5:
            r2 = v2;
            g2 = wh;
            b2 = n2;
            break;
        }
        return [r2 * 255, g2 * 255, b2 * 255];
      };
      convert.cmyk.rgb = function(cmyk) {
        const c2 = cmyk[0] / 100;
        const m2 = cmyk[1] / 100;
        const y2 = cmyk[2] / 100;
        const k2 = cmyk[3] / 100;
        const r2 = 1 - Math.min(1, c2 * (1 - k2) + k2);
        const g2 = 1 - Math.min(1, m2 * (1 - k2) + k2);
        const b2 = 1 - Math.min(1, y2 * (1 - k2) + k2);
        return [r2 * 255, g2 * 255, b2 * 255];
      };
      convert.xyz.rgb = function(xyz) {
        const x2 = xyz[0] / 100;
        const y2 = xyz[1] / 100;
        const z = xyz[2] / 100;
        let r2;
        let g2;
        let b2;
        r2 = x2 * 3.2406 + y2 * -1.5372 + z * -0.4986;
        g2 = x2 * -0.9689 + y2 * 1.8758 + z * 0.0415;
        b2 = x2 * 0.0557 + y2 * -0.204 + z * 1.057;
        r2 = r2 > 31308e-7 ? 1.055 * __pow(r2, 1 / 2.4) - 0.055 : r2 * 12.92;
        g2 = g2 > 31308e-7 ? 1.055 * __pow(g2, 1 / 2.4) - 0.055 : g2 * 12.92;
        b2 = b2 > 31308e-7 ? 1.055 * __pow(b2, 1 / 2.4) - 0.055 : b2 * 12.92;
        r2 = Math.min(Math.max(0, r2), 1);
        g2 = Math.min(Math.max(0, g2), 1);
        b2 = Math.min(Math.max(0, b2), 1);
        return [r2 * 255, g2 * 255, b2 * 255];
      };
      convert.xyz.lab = function(xyz) {
        let x2 = xyz[0];
        let y2 = xyz[1];
        let z = xyz[2];
        x2 /= 95.047;
        y2 /= 100;
        z /= 108.883;
        x2 = x2 > 8856e-6 ? __pow(x2, 1 / 3) : 7.787 * x2 + 16 / 116;
        y2 = y2 > 8856e-6 ? __pow(y2, 1 / 3) : 7.787 * y2 + 16 / 116;
        z = z > 8856e-6 ? __pow(z, 1 / 3) : 7.787 * z + 16 / 116;
        const l2 = 116 * y2 - 16;
        const a2 = 500 * (x2 - y2);
        const b2 = 200 * (y2 - z);
        return [l2, a2, b2];
      };
      convert.lab.xyz = function(lab) {
        const l2 = lab[0];
        const a2 = lab[1];
        const b2 = lab[2];
        let x2;
        let y2;
        let z;
        y2 = (l2 + 16) / 116;
        x2 = a2 / 500 + y2;
        z = y2 - b2 / 200;
        const y22 = __pow(y2, 3);
        const x22 = __pow(x2, 3);
        const z2 = __pow(z, 3);
        y2 = y22 > 8856e-6 ? y22 : (y2 - 16 / 116) / 7.787;
        x2 = x22 > 8856e-6 ? x22 : (x2 - 16 / 116) / 7.787;
        z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787;
        x2 *= 95.047;
        y2 *= 100;
        z *= 108.883;
        return [x2, y2, z];
      };
      convert.lab.lch = function(lab) {
        const l2 = lab[0];
        const a2 = lab[1];
        const b2 = lab[2];
        let h2;
        const hr = Math.atan2(b2, a2);
        h2 = hr * 360 / 2 / Math.PI;
        if (h2 < 0) {
          h2 += 360;
        }
        const c2 = Math.sqrt(a2 * a2 + b2 * b2);
        return [l2, c2, h2];
      };
      convert.lch.lab = function(lch) {
        const l2 = lch[0];
        const c2 = lch[1];
        const h2 = lch[2];
        const hr = h2 / 360 * 2 * Math.PI;
        const a2 = c2 * Math.cos(hr);
        const b2 = c2 * Math.sin(hr);
        return [l2, a2, b2];
      };
      convert.rgb.ansi16 = function(args, saturation = null) {
        const [r2, g2, b2] = args;
        let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation;
        value = Math.round(value / 50);
        if (value === 0) {
          return 30;
        }
        let ansi = 30 + (Math.round(b2 / 255) << 2 | Math.round(g2 / 255) << 1 | Math.round(r2 / 255));
        if (value === 2) {
          ansi += 60;
        }
        return ansi;
      };
      convert.hsv.ansi16 = function(args) {
        return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
      };
      convert.rgb.ansi256 = function(args) {
        const r2 = args[0];
        const g2 = args[1];
        const b2 = args[2];
        if (r2 === g2 && g2 === b2) {
          if (r2 < 8) {
            return 16;
          }
          if (r2 > 248) {
            return 231;
          }
          return Math.round((r2 - 8) / 247 * 24) + 232;
        }
        const ansi = 16 + 36 * Math.round(r2 / 255 * 5) + 6 * Math.round(g2 / 255 * 5) + Math.round(b2 / 255 * 5);
        return ansi;
      };
      convert.ansi16.rgb = function(args) {
        let color2 = args % 10;
        if (color2 === 0 || color2 === 7) {
          if (args > 50) {
            color2 += 3.5;
          }
          color2 = color2 / 10.5 * 255;
          return [color2, color2, color2];
        }
        const mult = (~~(args > 50) + 1) * 0.5;
        const r2 = (color2 & 1) * mult * 255;
        const g2 = (color2 >> 1 & 1) * mult * 255;
        const b2 = (color2 >> 2 & 1) * mult * 255;
        return [r2, g2, b2];
      };
      convert.ansi256.rgb = function(args) {
        if (args >= 232) {
          const c2 = (args - 232) * 10 + 8;
          return [c2, c2, c2];
        }
        args -= 16;
        let rem;
        const r2 = Math.floor(args / 36) / 5 * 255;
        const g2 = Math.floor((rem = args % 36) / 6) / 5 * 255;
        const b2 = rem % 6 / 5 * 255;
        return [r2, g2, b2];
      };
      convert.rgb.hex = function(args) {
        const integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
        const string = integer.toString(16).toUpperCase();
        return "000000".substring(string.length) + string;
      };
      convert.hex.rgb = function(args) {
        const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
        if (!match) {
          return [0, 0, 0];
        }
        let colorString = match[0];
        if (match[0].length === 3) {
          colorString = colorString.split("").map((char) => {
            return char + char;
          }).join("");
        }
        const integer = parseInt(colorString, 16);
        const r2 = integer >> 16 & 255;
        const g2 = integer >> 8 & 255;
        const b2 = integer & 255;
        return [r2, g2, b2];
      };
      convert.rgb.hcg = function(rgb) {
        const r2 = rgb[0] / 255;
        const g2 = rgb[1] / 255;
        const b2 = rgb[2] / 255;
        const max = Math.max(Math.max(r2, g2), b2);
        const min = Math.min(Math.min(r2, g2), b2);
        const chroma = max - min;
        let grayscale;
        let hue;
        if (chroma < 1) {
          grayscale = min / (1 - chroma);
        } else {
          grayscale = 0;
        }
        if (chroma <= 0) {
          hue = 0;
        } else if (max === r2) {
          hue = (g2 - b2) / chroma % 6;
        } else if (max === g2) {
          hue = 2 + (b2 - r2) / chroma;
        } else {
          hue = 4 + (r2 - g2) / chroma;
        }
        hue /= 6;
        hue %= 1;
        return [hue * 360, chroma * 100, grayscale * 100];
      };
      convert.hsl.hcg = function(hsl) {
        const s2 = hsl[1] / 100;
        const l2 = hsl[2] / 100;
        const c2 = l2 < 0.5 ? 2 * s2 * l2 : 2 * s2 * (1 - l2);
        let f2 = 0;
        if (c2 < 1) {
          f2 = (l2 - 0.5 * c2) / (1 - c2);
        }
        return [hsl[0], c2 * 100, f2 * 100];
      };
      convert.hsv.hcg = function(hsv) {
        const s2 = hsv[1] / 100;
        const v2 = hsv[2] / 100;
        const c2 = s2 * v2;
        let f2 = 0;
        if (c2 < 1) {
          f2 = (v2 - c2) / (1 - c2);
        }
        return [hsv[0], c2 * 100, f2 * 100];
      };
      convert.hcg.rgb = function(hcg) {
        const h2 = hcg[0] / 360;
        const c2 = hcg[1] / 100;
        const g2 = hcg[2] / 100;
        if (c2 === 0) {
          return [g2 * 255, g2 * 255, g2 * 255];
        }
        const pure = [0, 0, 0];
        const hi = h2 % 1 * 6;
        const v2 = hi % 1;
        const w2 = 1 - v2;
        let mg = 0;
        switch (Math.floor(hi)) {
          case 0:
            pure[0] = 1;
            pure[1] = v2;
            pure[2] = 0;
            break;
          case 1:
            pure[0] = w2;
            pure[1] = 1;
            pure[2] = 0;
            break;
          case 2:
            pure[0] = 0;
            pure[1] = 1;
            pure[2] = v2;
            break;
          case 3:
            pure[0] = 0;
            pure[1] = w2;
            pure[2] = 1;
            break;
          case 4:
            pure[0] = v2;
            pure[1] = 0;
            pure[2] = 1;
            break;
          default:
            pure[0] = 1;
            pure[1] = 0;
            pure[2] = w2;
        }
        mg = (1 - c2) * g2;
        return [
          (c2 * pure[0] + mg) * 255,
          (c2 * pure[1] + mg) * 255,
          (c2 * pure[2] + mg) * 255
        ];
      };
      convert.hcg.hsv = function(hcg) {
        const c2 = hcg[1] / 100;
        const g2 = hcg[2] / 100;
        const v2 = c2 + g2 * (1 - c2);
        let f2 = 0;
        if (v2 > 0) {
          f2 = c2 / v2;
        }
        return [hcg[0], f2 * 100, v2 * 100];
      };
      convert.hcg.hsl = function(hcg) {
        const c2 = hcg[1] / 100;
        const g2 = hcg[2] / 100;
        const l2 = g2 * (1 - c2) + 0.5 * c2;
        let s2 = 0;
        if (l2 > 0 && l2 < 0.5) {
          s2 = c2 / (2 * l2);
        } else if (l2 >= 0.5 && l2 < 1) {
          s2 = c2 / (2 * (1 - l2));
        }
        return [hcg[0], s2 * 100, l2 * 100];
      };
      convert.hcg.hwb = function(hcg) {
        const c2 = hcg[1] / 100;
        const g2 = hcg[2] / 100;
        const v2 = c2 + g2 * (1 - c2);
        return [hcg[0], (v2 - c2) * 100, (1 - v2) * 100];
      };
      convert.hwb.hcg = function(hwb) {
        const w2 = hwb[1] / 100;
        const b2 = hwb[2] / 100;
        const v2 = 1 - b2;
        const c2 = v2 - w2;
        let g2 = 0;
        if (c2 < 1) {
          g2 = (v2 - c2) / (1 - c2);
        }
        return [hwb[0], c2 * 100, g2 * 100];
      };
      convert.apple.rgb = function(apple) {
        return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
      };
      convert.rgb.apple = function(rgb) {
        return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
      };
      convert.gray.rgb = function(args) {
        return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
      };
      convert.gray.hsl = function(args) {
        return [0, 0, args[0]];
      };
      convert.gray.hsv = convert.gray.hsl;
      convert.gray.hwb = function(gray) {
        return [0, 100, gray[0]];
      };
      convert.gray.cmyk = function(gray) {
        return [0, 0, 0, gray[0]];
      };
      convert.gray.lab = function(gray) {
        return [gray[0], 0, 0];
      };
      convert.gray.hex = function(gray) {
        const val = Math.round(gray[0] / 100 * 255) & 255;
        const integer = (val << 16) + (val << 8) + val;
        const string = integer.toString(16).toUpperCase();
        return "000000".substring(string.length) + string;
      };
      convert.rgb.gray = function(rgb) {
        const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
        return [val / 255 * 100];
      };
      return conversions;
    }
    var route;
    var hasRequiredRoute;
    function requireRoute() {
      if (hasRequiredRoute)
        return route;
      hasRequiredRoute = 1;
      const conversions2 = requireConversions();
      function buildGraph() {
        const graph = {};
        const models = Object.keys(conversions2);
        for (let len = models.length, i2 = 0; i2 < len; i2++) {
          graph[models[i2]] = {
            // http://jsperf.com/1-vs-infinity
            // micro-opt, but this is simple.
            distance: -1,
            parent: null
          };
        }
        return graph;
      }
      function deriveBFS(fromModel) {
        const graph = buildGraph();
        const queue = [fromModel];
        graph[fromModel].distance = 0;
        while (queue.length) {
          const current = queue.pop();
          const adjacents = Object.keys(conversions2[current]);
          for (let len = adjacents.length, i2 = 0; i2 < len; i2++) {
            const adjacent = adjacents[i2];
            const node = graph[adjacent];
            if (node.distance === -1) {
              node.distance = graph[current].distance + 1;
              node.parent = current;
              queue.unshift(adjacent);
            }
          }
        }
        return graph;
      }
      function link(from, to) {
        return function(args) {
          return to(from(args));
        };
      }
      function wrapConversion(toModel, graph) {
        const path = [graph[toModel].parent, toModel];
        let fn = conversions2[graph[toModel].parent][toModel];
        let cur = graph[toModel].parent;
        while (graph[cur].parent) {
          path.unshift(graph[cur].parent);
          fn = link(conversions2[graph[cur].parent][cur], fn);
          cur = graph[cur].parent;
        }
        fn.conversion = path;
        return fn;
      }
      route = function(fromModel) {
        const graph = deriveBFS(fromModel);
        const conversion = {};
        const models = Object.keys(graph);
        for (let len = models.length, i2 = 0; i2 < len; i2++) {
          const toModel = models[i2];
          const node = graph[toModel];
          if (node.parent === null) {
            continue;
          }
          conversion[toModel] = wrapConversion(toModel, graph);
        }
        return conversion;
      };
      return route;
    }
    var colorConvert;
    var hasRequiredColorConvert;
    function requireColorConvert() {
      if (hasRequiredColorConvert)
        return colorConvert;
      hasRequiredColorConvert = 1;
      const conversions2 = requireConversions();
      const route2 = requireRoute();
      const convert = {};
      const models = Object.keys(conversions2);
      function wrapRaw(fn) {
        const wrappedFn = function(...args) {
          const arg0 = args[0];
          if (arg0 === void 0 || arg0 === null) {
            return arg0;
          }
          if (arg0.length > 1) {
            args = arg0;
          }
          return fn(args);
        };
        if ("conversion" in fn) {
          wrappedFn.conversion = fn.conversion;
        }
        return wrappedFn;
      }
      function wrapRounded(fn) {
        const wrappedFn = function(...args) {
          const arg0 = args[0];
          if (arg0 === void 0 || arg0 === null) {
            return arg0;
          }
          if (arg0.length > 1) {
            args = arg0;
          }
          const result = fn(args);
          if (typeof result === "object") {
            for (let len = result.length, i2 = 0; i2 < len; i2++) {
              result[i2] = Math.round(result[i2]);
            }
          }
          return result;
        };
        if ("conversion" in fn) {
          wrappedFn.conversion = fn.conversion;
        }
        return wrappedFn;
      }
      models.forEach((fromModel) => {
        convert[fromModel] = {};
        Object.defineProperty(convert[fromModel], "channels", { value: conversions2[fromModel].channels });
        Object.defineProperty(convert[fromModel], "labels", { value: conversions2[fromModel].labels });
        const routes2 = route2(fromModel);
        const routeModels = Object.keys(routes2);
        routeModels.forEach((toModel) => {
          const fn = routes2[toModel];
          convert[fromModel][toModel] = wrapRounded(fn);
          convert[fromModel][toModel].raw = wrapRaw(fn);
        });
      });
      colorConvert = convert;
      return colorConvert;
    }
    ansiStyles$1.exports;
    (function(module2) {
      const wrapAnsi16 = (fn, offset) => (...args) => {
        const code = fn(...args);
        return `\x1B[${code + offset}m`;
      };
      const wrapAnsi256 = (fn, offset) => (...args) => {
        const code = fn(...args);
        return `\x1B[${38 + offset};5;${code}m`;
      };
      const wrapAnsi16m = (fn, offset) => (...args) => {
        const rgb = fn(...args);
        return `\x1B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
      };
      const ansi2ansi = (n2) => n2;
      const rgb2rgb = (r2, g2, b2) => [r2, g2, b2];
      const setLazyProperty = (object, property, get) => {
        Object.defineProperty(object, property, {
          get: () => {
            const value = get();
            Object.defineProperty(object, property, {
              value,
              enumerable: true,
              configurable: true
            });
            return value;
          },
          enumerable: true,
          configurable: true
        });
      };
      let colorConvert2;
      const makeDynamicStyles = (wrap2, targetSpace, identity, isBackground) => {
        if (colorConvert2 === void 0) {
          colorConvert2 = requireColorConvert();
        }
        const offset = isBackground ? 10 : 0;
        const styles2 = {};
        for (const [sourceSpace, suite] of Object.entries(colorConvert2)) {
          const name = sourceSpace === "ansi16" ? "ansi" : sourceSpace;
          if (sourceSpace === targetSpace) {
            styles2[name] = wrap2(identity, offset);
          } else if (typeof suite === "object") {
            styles2[name] = wrap2(suite[targetSpace], offset);
          }
        }
        return styles2;
      };
      function assembleStyles() {
        const codes = /* @__PURE__ */ new Map();
        const styles2 = {
          modifier: {
            reset: [0, 0],
            // 21 isn't widely supported and 22 does the same thing
            bold: [1, 22],
            dim: [2, 22],
            italic: [3, 23],
            underline: [4, 24],
            inverse: [7, 27],
            hidden: [8, 28],
            strikethrough: [9, 29]
          },
          color: {
            black: [30, 39],
            red: [31, 39],
            green: [32, 39],
            yellow: [33, 39],
            blue: [34, 39],
            magenta: [35, 39],
            cyan: [36, 39],
            white: [37, 39],
            // Bright color
            blackBright: [90, 39],
            redBright: [91, 39],
            greenBright: [92, 39],
            yellowBright: [93, 39],
            blueBright: [94, 39],
            magentaBright: [95, 39],
            cyanBright: [96, 39],
            whiteBright: [97, 39]
          },
          bgColor: {
            bgBlack: [40, 49],
            bgRed: [41, 49],
            bgGreen: [42, 49],
            bgYellow: [43, 49],
            bgBlue: [44, 49],
            bgMagenta: [45, 49],
            bgCyan: [46, 49],
            bgWhite: [47, 49],
            // Bright color
            bgBlackBright: [100, 49],
            bgRedBright: [101, 49],
            bgGreenBright: [102, 49],
            bgYellowBright: [103, 49],
            bgBlueBright: [104, 49],
            bgMagentaBright: [105, 49],
            bgCyanBright: [106, 49],
            bgWhiteBright: [107, 49]
          }
        };
        styles2.color.gray = styles2.color.blackBright;
        styles2.bgColor.bgGray = styles2.bgColor.bgBlackBright;
        styles2.color.grey = styles2.color.blackBright;
        styles2.bgColor.bgGrey = styles2.bgColor.bgBlackBright;
        for (const [groupName, group] of Object.entries(styles2)) {
          for (const [styleName, style] of Object.entries(group)) {
            styles2[styleName] = {
              open: `\x1B[${style[0]}m`,
              close: `\x1B[${style[1]}m`
            };
            group[styleName] = styles2[styleName];
            codes.set(style[0], style[1]);
          }
          Object.defineProperty(styles2, groupName, {
            value: group,
            enumerable: false
          });
        }
        Object.defineProperty(styles2, "codes", {
          value: codes,
          enumerable: false
        });
        styles2.color.close = "\x1B[39m";
        styles2.bgColor.close = "\x1B[49m";
        setLazyProperty(styles2.color, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, false));
        setLazyProperty(styles2.color, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, false));
        setLazyProperty(styles2.color, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, false));
        setLazyProperty(styles2.bgColor, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, true));
        setLazyProperty(styles2.bgColor, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, true));
        setLazyProperty(styles2.bgColor, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, true));
        return styles2;
      }
      Object.defineProperty(module2, "exports", {
        enumerable: true,
        get: assembleStyles
      });
    })(ansiStyles$1);
    var ansiStylesExports = ansiStyles$1.exports;
    var browser = {
      stdout: false,
      stderr: false
    };
    const stringReplaceAll$1 = (string, substring, replacer) => {
      let index = string.indexOf(substring);
      if (index === -1) {
        return string;
      }
      const substringLength = substring.length;
      let endIndex = 0;
      let returnValue = "";
      do {
        returnValue += string.substr(endIndex, index - endIndex) + substring + replacer;
        endIndex = index + substringLength;
        index = string.indexOf(substring, endIndex);
      } while (index !== -1);
      returnValue += string.substr(endIndex);
      return returnValue;
    };
    const stringEncaseCRLFWithFirstIndex$1 = (string, prefix, postfix, index) => {
      let endIndex = 0;
      let returnValue = "";
      do {
        const gotCR = string[index - 1] === "\r";
        returnValue += string.substr(endIndex, (gotCR ? index - 1 : index) - endIndex) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
        endIndex = index + 1;
        index = string.indexOf("\n", endIndex);
      } while (index !== -1);
      returnValue += string.substr(endIndex);
      return returnValue;
    };
    var util = {
      stringReplaceAll: stringReplaceAll$1,
      stringEncaseCRLFWithFirstIndex: stringEncaseCRLFWithFirstIndex$1
    };
    var templates;
    var hasRequiredTemplates;
    function requireTemplates() {
      if (hasRequiredTemplates)
        return templates;
      hasRequiredTemplates = 1;
      const TEMPLATE_REGEX = /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
      const STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
      const STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
      const ESCAPE_REGEX = /\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.)|([^\\])/gi;
      const ESCAPES = /* @__PURE__ */ new Map([
        ["n", "\n"],
        ["r", "\r"],
        ["t", "	"],
        ["b", "\b"],
        ["f", "\f"],
        ["v", "\v"],
        ["0", "\0"],
        ["\\", "\\"],
        ["e", "\x1B"],
        ["a", "\x07"]
      ]);
      function unescape(c2) {
        const u2 = c2[0] === "u";
        const bracket = c2[1] === "{";
        if (u2 && !bracket && c2.length === 5 || c2[0] === "x" && c2.length === 3) {
          return String.fromCharCode(parseInt(c2.slice(1), 16));
        }
        if (u2 && bracket) {
          return String.fromCodePoint(parseInt(c2.slice(2, -1), 16));
        }
        return ESCAPES.get(c2) || c2;
      }
      function parseArguments(name, arguments_) {
        const results = [];
        const chunks = arguments_.trim().split(/\s*,\s*/g);
        let matches;
        for (const chunk of chunks) {
          const number = Number(chunk);
          if (!Number.isNaN(number)) {
            results.push(number);
          } else if (matches = chunk.match(STRING_REGEX)) {
            results.push(matches[2].replace(ESCAPE_REGEX, (m2, escape2, character) => escape2 ? unescape(escape2) : character));
          } else {
            throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
          }
        }
        return results;
      }
      function parseStyle(style) {
        STYLE_REGEX.lastIndex = 0;
        const results = [];
        let matches;
        while ((matches = STYLE_REGEX.exec(style)) !== null) {
          const name = matches[1];
          if (matches[2]) {
            const args = parseArguments(name, matches[2]);
            results.push([name].concat(args));
          } else {
            results.push([name]);
          }
        }
        return results;
      }
      function buildStyle(chalk2, styles2) {
        const enabled = {};
        for (const layer of styles2) {
          for (const style of layer.styles) {
            enabled[style[0]] = layer.inverse ? null : style.slice(1);
          }
        }
        let current = chalk2;
        for (const [styleName, styles3] of Object.entries(enabled)) {
          if (!Array.isArray(styles3)) {
            continue;
          }
          if (!(styleName in current)) {
            throw new Error(`Unknown Chalk style: ${styleName}`);
          }
          current = styles3.length > 0 ? current[styleName](...styles3) : current[styleName];
        }
        return current;
      }
      templates = (chalk2, temporary) => {
        const styles2 = [];
        const chunks = [];
        let chunk = [];
        temporary.replace(TEMPLATE_REGEX, (m2, escapeCharacter, inverse, style, close, character) => {
          if (escapeCharacter) {
            chunk.push(unescape(escapeCharacter));
          } else if (style) {
            const string = chunk.join("");
            chunk = [];
            chunks.push(styles2.length === 0 ? string : buildStyle(chalk2, styles2)(string));
            styles2.push({ inverse, styles: parseStyle(style) });
          } else if (close) {
            if (styles2.length === 0) {
              throw new Error("Found extraneous } in Chalk template literal");
            }
            chunks.push(buildStyle(chalk2, styles2)(chunk.join("")));
            chunk = [];
            styles2.pop();
          } else {
            chunk.push(character);
          }
        });
        chunks.push(chunk.join(""));
        if (styles2.length > 0) {
          const errMsg = `Chalk template literal is missing ${styles2.length} closing bracket${styles2.length === 1 ? "" : "s"} (\`}\`)`;
          throw new Error(errMsg);
        }
        return chunks.join("");
      };
      return templates;
    }
    const ansiStyles = ansiStylesExports;
    const { stdout: stdoutColor, stderr: stderrColor } = browser;
    const {
      stringReplaceAll,
      stringEncaseCRLFWithFirstIndex
    } = util;
    const levelMapping = [
      "ansi",
      "ansi",
      "ansi256",
      "ansi16m"
    ];
    const styles = /* @__PURE__ */ Object.create(null);
    const applyOptions = (object, options = {}) => {
      if (options.level > 3 || options.level < 0) {
        throw new Error("The `level` option should be an integer from 0 to 3");
      }
      const colorLevel = stdoutColor ? stdoutColor.level : 0;
      object.level = options.level === void 0 ? colorLevel : options.level;
    };
    class ChalkClass {
      constructor(options) {
        return chalkFactory(options);
      }
    }
    const chalkFactory = (options) => {
      const chalk2 = {};
      applyOptions(chalk2, options);
      chalk2.template = (...arguments_) => chalkTag(chalk2.template, ...arguments_);
      Object.setPrototypeOf(chalk2, Chalk.prototype);
      Object.setPrototypeOf(chalk2.template, chalk2);
      chalk2.template.constructor = () => {
        throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.");
      };
      chalk2.template.Instance = ChalkClass;
      return chalk2.template;
    };
    function Chalk(options) {
      return chalkFactory(options);
    }
    for (const [styleName, style] of Object.entries(ansiStyles)) {
      styles[styleName] = {
        get() {
          const builder = createBuilder(this, createStyler(style.open, style.close, this._styler), this._isEmpty);
          Object.defineProperty(this, styleName, { value: builder });
          return builder;
        }
      };
    }
    styles.visible = {
      get() {
        const builder = createBuilder(this, this._styler, true);
        Object.defineProperty(this, "visible", { value: builder });
        return builder;
      }
    };
    const usedModels = ["rgb", "hex", "keyword", "hsl", "hsv", "hwb", "ansi", "ansi256"];
    for (const model of usedModels) {
      styles[model] = {
        get() {
          const { level } = this;
          return function(...arguments_) {
            const styler = createStyler(ansiStyles.color[levelMapping[level]][model](...arguments_), ansiStyles.color.close, this._styler);
            return createBuilder(this, styler, this._isEmpty);
          };
        }
      };
    }
    for (const model of usedModels) {
      const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
      styles[bgModel] = {
        get() {
          const { level } = this;
          return function(...arguments_) {
            const styler = createStyler(ansiStyles.bgColor[levelMapping[level]][model](...arguments_), ansiStyles.bgColor.close, this._styler);
            return createBuilder(this, styler, this._isEmpty);
          };
        }
      };
    }
    const proto = Object.defineProperties(() => {
    }, __spreadProps(__spreadValues({}, styles), {
      level: {
        enumerable: true,
        get() {
          return this._generator.level;
        },
        set(level) {
          this._generator.level = level;
        }
      }
    }));
    const createStyler = (open, close, parent) => {
      let openAll;
      let closeAll;
      if (parent === void 0) {
        openAll = open;
        closeAll = close;
      } else {
        openAll = parent.openAll + open;
        closeAll = close + parent.closeAll;
      }
      return {
        open,
        close,
        openAll,
        closeAll,
        parent
      };
    };
    const createBuilder = (self2, _styler, _isEmpty) => {
      const builder = (...arguments_) => {
        return applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
      };
      builder.__proto__ = proto;
      builder._generator = self2;
      builder._styler = _styler;
      builder._isEmpty = _isEmpty;
      return builder;
    };
    const applyStyle = (self2, string) => {
      if (self2.level <= 0 || !string) {
        return self2._isEmpty ? "" : string;
      }
      let styler = self2._styler;
      if (styler === void 0) {
        return string;
      }
      const { openAll, closeAll } = styler;
      if (string.indexOf("\x1B") !== -1) {
        while (styler !== void 0) {
          string = stringReplaceAll(string, styler.close, styler.open);
          styler = styler.parent;
        }
      }
      const lfIndex = string.indexOf("\n");
      if (lfIndex !== -1) {
        string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
      }
      return openAll + string + closeAll;
    };
    let template;
    const chalkTag = (chalk2, ...strings) => {
      const [firstString] = strings;
      if (!Array.isArray(firstString)) {
        return strings.join(" ");
      }
      const arguments_ = strings.slice(1);
      const parts = [firstString.raw[0]];
      for (let i2 = 1; i2 < firstString.length; i2++) {
        parts.push(
          String(arguments_[i2 - 1]).replace(/[{}\\]/g, "\\$&"),
          String(firstString.raw[i2])
        );
      }
      if (template === void 0) {
        template = requireTemplates();
      }
      return template(chalk2, parts.join(""));
    };
    Object.defineProperties(Chalk.prototype, styles);
    const chalk = Chalk();
    chalk.supportsColor = stdoutColor;
    chalk.stderr = Chalk({ level: stderrColor ? stderrColor.level : 0 });
    chalk.stderr.supportsColor = stderrColor;
    chalk.Level = {
      None: 0,
      Basic: 1,
      Ansi256: 2,
      TrueColor: 3,
      0: "None",
      1: "Basic",
      2: "Ansi256",
      3: "TrueColor"
    };
    var source = chalk;
    const chalk$1 = /* @__PURE__ */ getDefaultExportFromCjs(source);
    const isArray = typeof Array.isArray === "function" ? Array.isArray : (a2) => a2 instanceof Array;
    const getObjectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (obj) => {
      const names = [];
      for (const property in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, property)) {
          names.push(property);
        }
      }
      return names;
    };
    const trimUnderscore = (str) => {
      if (str.substr(0, 1) === "_") {
        return str.slice(1);
      }
      return str;
    };
    const arrayKeyToSortNumber = (key) => {
      if (key === "_t") {
        return -1;
      } else {
        if (key.substr(0, 1) === "_") {
          return parseInt(key.slice(1), 10);
        } else {
          return parseInt(key, 10) + 0.1;
        }
      }
    };
    const arrayKeyComparer = (key1, key2) => arrayKeyToSortNumber(key1) - arrayKeyToSortNumber(key2);
    class BaseFormatter {
      format(delta, left) {
        const context = {};
        this.prepareContext(context);
        this.recurse(context, delta, left);
        return this.finalize(context);
      }
      prepareContext(context) {
        context.buffer = [];
        context.out = function() {
          this.buffer.push(...arguments);
        };
      }
      typeFormattterNotFound(context, deltaType) {
        throw new Error(`cannot format delta type: ${deltaType}`);
      }
      typeFormattterErrorFormatter(context, err) {
        return err.toString();
      }
      finalize(_ref) {
        let {
          buffer
        } = _ref;
        if (isArray(buffer)) {
          return buffer.join("");
        }
      }
      recurse(context, delta, left, key, leftKey, movedFrom, isLast) {
        const useMoveOriginHere = delta && movedFrom;
        const leftValue = useMoveOriginHere ? movedFrom.value : left;
        if (typeof delta === "undefined" && typeof key === "undefined") {
          return void 0;
        }
        const type = this.getDeltaType(delta, movedFrom);
        const nodeType = type === "node" ? delta._t === "a" ? "array" : "object" : "";
        if (typeof key !== "undefined") {
          this.nodeBegin(context, key, leftKey, type, nodeType, isLast);
        } else {
          this.rootBegin(context, type, nodeType);
        }
        let typeFormattter;
        try {
          typeFormattter = this[`format_${type}`] || this.typeFormattterNotFound(context, type);
          typeFormattter.call(this, context, delta, leftValue, key, leftKey, movedFrom);
        } catch (err) {
          this.typeFormattterErrorFormatter(context, err, delta, leftValue, key, leftKey, movedFrom);
          if (typeof console !== "undefined" && console.error) {
            console.error(err.stack);
          }
        }
        if (typeof key !== "undefined") {
          this.nodeEnd(context, key, leftKey, type, nodeType, isLast);
        } else {
          this.rootEnd(context, type, nodeType);
        }
      }
      formatDeltaChildren(context, delta, left) {
        const self2 = this;
        this.forEachDeltaKey(delta, left, (key, leftKey, movedFrom, isLast) => {
          self2.recurse(context, delta[key], left ? left[leftKey] : void 0, key, leftKey, movedFrom, isLast);
        });
      }
      forEachDeltaKey(delta, left, fn) {
        const keys = getObjectKeys(delta);
        const arrayKeys = delta._t === "a";
        const moveDestinations = {};
        let name;
        if (typeof left !== "undefined") {
          for (name in left) {
            if (Object.prototype.hasOwnProperty.call(left, name)) {
              if (typeof delta[name] === "undefined" && (!arrayKeys || typeof delta[`_${name}`] === "undefined")) {
                keys.push(name);
              }
            }
          }
        }
        for (name in delta) {
          if (Object.prototype.hasOwnProperty.call(delta, name)) {
            const value = delta[name];
            if (isArray(value) && value[2] === 3) {
              moveDestinations[value[1].toString()] = {
                key: name,
                value: left && left[parseInt(name.substr(1))]
              };
              if (this.includeMoveDestinations !== false) {
                if (typeof left === "undefined" && typeof delta[value[1]] === "undefined") {
                  keys.push(value[1].toString());
                }
              }
            }
          }
        }
        if (arrayKeys) {
          keys.sort(arrayKeyComparer);
        } else {
          keys.sort();
        }
        for (let index = 0, length = keys.length; index < length; index++) {
          const key = keys[index];
          if (arrayKeys && key === "_t") {
            continue;
          }
          const leftKey = arrayKeys ? typeof key === "number" ? key : parseInt(trimUnderscore(key), 10) : key;
          const isLast = index === length - 1;
          fn(key, leftKey, moveDestinations[leftKey], isLast);
        }
      }
      getDeltaType(delta, movedFrom) {
        if (typeof delta === "undefined") {
          if (typeof movedFrom !== "undefined") {
            return "movedestination";
          }
          return "unchanged";
        }
        if (isArray(delta)) {
          if (delta.length === 1) {
            return "added";
          }
          if (delta.length === 2) {
            return "modified";
          }
          if (delta.length === 3 && delta[2] === 0) {
            return "deleted";
          }
          if (delta.length === 3 && delta[2] === 2) {
            return "textdiff";
          }
          if (delta.length === 3 && delta[2] === 3) {
            return "moved";
          }
        } else if (typeof delta === "object") {
          return "node";
        }
        return "unknown";
      }
      parseTextDiff(value) {
        const output = [];
        const lines = value.split("\n@@ ");
        for (let i2 = 0, l2 = lines.length; i2 < l2; i2++) {
          const line = lines[i2];
          const lineOutput = {
            pieces: []
          };
          const location2 = /^(?:@@ )?[-+]?(\d+),(\d+)/.exec(line).slice(1);
          lineOutput.location = {
            line: location2[0],
            chr: location2[1]
          };
          const pieces = line.split("\n").slice(1);
          for (let pieceIndex = 0, piecesLength = pieces.length; pieceIndex < piecesLength; pieceIndex++) {
            const piece = pieces[pieceIndex];
            if (!piece.length) {
              continue;
            }
            const pieceOutput = {
              type: "context"
            };
            if (piece.substr(0, 1) === "+") {
              pieceOutput.type = "added";
            } else if (piece.substr(0, 1) === "-") {
              pieceOutput.type = "deleted";
            }
            pieceOutput.text = piece.slice(1);
            lineOutput.pieces.push(pieceOutput);
          }
          output.push(lineOutput);
        }
        return output;
      }
    }
    class AnnotatedFormatter extends BaseFormatter {
      constructor() {
        super();
        this.includeMoveDestinations = false;
      }
      prepareContext(context) {
        super.prepareContext(context);
        context.indent = function(levels) {
          this.indentLevel = (this.indentLevel || 0) + (typeof levels === "undefined" ? 1 : levels);
          this.indentPad = new Array(this.indentLevel + 1).join("&nbsp;&nbsp;");
        };
        context.row = (json, htmlNote) => {
          context.out('<tr><td style="white-space: nowrap;"><pre class="jsondiffpatch-annotated-indent" style="display: inline-block">');
          context.out(context.indentPad);
          context.out('</pre><pre style="display: inline-block">');
          context.out(json);
          context.out('</pre></td><td class="jsondiffpatch-delta-note"><div>');
          context.out(htmlNote);
          context.out("</div></td></tr>");
        };
      }
      typeFormattterErrorFormatter(context, err) {
        context.row("", `<pre class="jsondiffpatch-error">${err}</pre>`);
      }
      formatTextDiffString(context, value) {
        const lines = this.parseTextDiff(value);
        context.out('<ul class="jsondiffpatch-textdiff">');
        for (let i2 = 0, l2 = lines.length; i2 < l2; i2++) {
          const line = lines[i2];
          context.out(`<li><div class="jsondiffpatch-textdiff-location"><span class="jsondiffpatch-textdiff-line-number">${line.location.line}</span><span class="jsondiffpatch-textdiff-char">${line.location.chr}</span></div><div class="jsondiffpatch-textdiff-line">`);
          const pieces = line.pieces;
          for (let pieceIndex = 0, piecesLength = pieces.length; pieceIndex < piecesLength; pieceIndex++) {
            const piece = pieces[pieceIndex];
            context.out(`<span class="jsondiffpatch-textdiff-${piece.type}">${piece.text}</span>`);
          }
          context.out("</div></li>");
        }
        context.out("</ul>");
      }
      rootBegin(context, type, nodeType) {
        context.out('<table class="jsondiffpatch-annotated-delta">');
        if (type === "node") {
          context.row("{");
          context.indent();
        }
        if (nodeType === "array") {
          context.row('"_t": "a",', "Array delta (member names indicate array indices)");
        }
      }
      rootEnd(context, type) {
        if (type === "node") {
          context.indent(-1);
          context.row("}");
        }
        context.out("</table>");
      }
      nodeBegin(context, key, leftKey, type, nodeType) {
        context.row(`&quot;${key}&quot;: {`);
        if (type === "node") {
          context.indent();
        }
        if (nodeType === "array") {
          context.row('"_t": "a",', "Array delta (member names indicate array indices)");
        }
      }
      nodeEnd(context, key, leftKey, type, nodeType, isLast) {
        if (type === "node") {
          context.indent(-1);
        }
        context.row(`}${isLast ? "" : ","}`);
      }
      /* jshint camelcase: false */
      /* eslint-disable camelcase */
      format_unchanged() {
      }
      format_movedestination() {
      }
      format_node(context, delta, left) {
        this.formatDeltaChildren(context, delta, left);
      }
    }
    const wrapPropertyName = (name) => `<pre style="display:inline-block">&quot;${name}&quot;</pre>`;
    const deltaAnnotations = {
      added(delta, left, key, leftKey) {
        const formatLegend = " <pre>([newValue])</pre>";
        if (typeof leftKey === "undefined") {
          return `new value${formatLegend}`;
        }
        if (typeof leftKey === "number") {
          return `insert at index ${leftKey}${formatLegend}`;
        }
        return `add property ${wrapPropertyName(leftKey)}${formatLegend}`;
      },
      modified(delta, left, key, leftKey) {
        const formatLegend = " <pre>([previousValue, newValue])</pre>";
        if (typeof leftKey === "undefined") {
          return `modify value${formatLegend}`;
        }
        if (typeof leftKey === "number") {
          return `modify at index ${leftKey}${formatLegend}`;
        }
        return `modify property ${wrapPropertyName(leftKey)}${formatLegend}`;
      },
      deleted(delta, left, key, leftKey) {
        const formatLegend = " <pre>([previousValue, 0, 0])</pre>";
        if (typeof leftKey === "undefined") {
          return `delete value${formatLegend}`;
        }
        if (typeof leftKey === "number") {
          return `remove index ${leftKey}${formatLegend}`;
        }
        return `delete property ${wrapPropertyName(leftKey)}${formatLegend}`;
      },
      moved(delta, left, key, leftKey) {
        return `move from <span title="(position to remove at original state)">index ${leftKey}</span> to <span title="(position to insert at final state)">index ${delta[1]}</span>`;
      },
      textdiff(delta, left, key, leftKey) {
        const location2 = typeof leftKey === "undefined" ? "" : typeof leftKey === "number" ? ` at index ${leftKey}` : ` at property ${wrapPropertyName(leftKey)}`;
        return `text diff${location2}, format is <a href="https://code.google.com/p/google-diff-match-patch/wiki/Unidiff">a variation of Unidiff</a>`;
      }
    };
    const formatAnyChange = function(context, delta) {
      const deltaType = this.getDeltaType(delta);
      const annotator = deltaAnnotations[deltaType];
      const htmlNote = annotator && annotator.apply(annotator, Array.prototype.slice.call(arguments, 1));
      let json = JSON.stringify(delta, null, 2);
      if (deltaType === "textdiff") {
        json = json.split("\\n").join('\\n"+\n   "');
      }
      context.indent();
      context.row(json, htmlNote);
      context.indent(-1);
    };
    AnnotatedFormatter.prototype.format_added = formatAnyChange;
    AnnotatedFormatter.prototype.format_modified = formatAnyChange;
    AnnotatedFormatter.prototype.format_deleted = formatAnyChange;
    AnnotatedFormatter.prototype.format_moved = formatAnyChange;
    AnnotatedFormatter.prototype.format_textdiff = formatAnyChange;
    function chalkColor(name) {
      return chalk$1 && chalk$1[name] || function() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return args;
      };
    }
    ({
      added: chalkColor("green"),
      deleted: chalkColor("red"),
      movedestination: chalkColor("gray"),
      moved: chalkColor("yellow"),
      unchanged: chalkColor("gray"),
      error: chalkColor("white.bgRed"),
      textDiffLine: chalkColor("gray")
    });
    const Diff_svelte_svelte_type_style_lang = "";
    const ATOMS = {
      button: Button,
      checkbox: Checkbox,
      dropdown: Dropdown,
      select: Dropdown,
      input: Input$1,
      colorbox: ColorPicker_1,
      label: Label,
      radio: Radio,
      status: Status,
      textarea: Textarea,
      json: Textarea,
      fileInput: FileInput
    };
    const MOLECULES = {
      inputTags: InputTags
    };
    const ORGANISMS = {
      table: Table
    };
    const COMPONENTS = __spreadValues(__spreadValues(__spreadValues({}, ATOMS), MOLECULES), ORGANISMS);
    function get_each_context$5(ctx, list, i2) {
      const child_ctx = ctx.slice();
      child_ctx[10] = list[i2].name;
      child_ctx[11] = list[i2].href;
      const constants_0 = (
        /*$selectedMenu*/
        child_ctx[3].startsWith(
          /*href*/
          child_ctx[11]
        )
      );
      child_ctx[12] = constants_0;
      return child_ctx;
    }
    function create_each_block$5(ctx) {
      let li;
      let div;
      let span;
      let t0_value = (
        /*name*/
        ctx[10] + ""
      );
      let t0;
      let t1;
      let mounted;
      let dispose;
      function click_handler2() {
        return (
          /*click_handler*/
          ctx[5](
            /*href*/
            ctx[11]
          )
        );
      }
      return {
        c() {
          li = element("li");
          div = element("div");
          span = element("span");
          t0 = text(t0_value);
          t1 = space();
          attr(span, "class", "align-middle");
          attr(div, "class", "menu-id ms-3 d-inline");
          attr(li, "class", "menu-item w-85 px-3 py-2 my-2");
          set_style(li, "cursor", "pointer");
          toggle_class(
            li,
            "selected",
            /*selected*/
            ctx[12]
          );
        },
        m(target, anchor) {
          insert(target, li, anchor);
          append(li, div);
          append(div, span);
          append(span, t0);
          insert(target, t1, anchor);
          if (!mounted) {
            dispose = listen(li, "click", click_handler2);
            mounted = true;
          }
        },
        p(new_ctx, dirty) {
          ctx = new_ctx;
          if (dirty & /*$selectedMenu, sidebar*/
          9) {
            toggle_class(
              li,
              "selected",
              /*selected*/
              ctx[12]
            );
          }
        },
        d(detaching) {
          if (detaching)
            detach(li);
          if (detaching)
            detach(t1);
          mounted = false;
          dispose();
        }
      };
    }
    function create_fragment$b(ctx) {
      let aside;
      let div4;
      let div0;
      let t0;
      let div3;
      let div1;
      let t2;
      let div2;
      let button;
      let t4;
      let hr0;
      let t5;
      let div5;
      let ul;
      let t6;
      let hr1;
      let t7;
      let div6;
      let mounted;
      let dispose;
      let each_value = (
        /*sidebar*/
        ctx[0]
      );
      let each_blocks = [];
      for (let i2 = 0; i2 < each_value.length; i2 += 1) {
        each_blocks[i2] = create_each_block$5(get_each_context$5(ctx, each_value, i2));
      }
      return {
        c() {
          aside = element("aside");
          div4 = element("div");
          div0 = element("div");
          t0 = space();
          div3 = element("div");
          div1 = element("div");
          div1.textContent = "Fiirn";
          t2 = space();
          div2 = element("div");
          button = element("button");
          button.innerHTML = `fiirn@diffday.io<b></b>`;
          t4 = space();
          hr0 = element("hr");
          t5 = space();
          div5 = element("div");
          ul = element("ul");
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            each_blocks[i2].c();
          }
          t6 = space();
          hr1 = element("hr");
          t7 = space();
          div6 = element("div");
          attr(div0, "class", "h-50 phase_badge");
          attr(button, "class", "sidebar-menu-btn btn");
          attr(div2, "class", "position-relative align-items-center d-inline-block");
          attr(div3, "class", "d-flex flex-column justify-content-center text-center h-50 fw-bolder");
          attr(div4, "class", "sidebar-header");
          attr(hr0, "class", "solid");
          attr(div5, "class", "sidebar-menu");
          attr(hr1, "class", "solid");
          attr(div6, "class", "sidebar-footer p-2");
          attr(aside, "class", "sidebar-container text-white");
          toggle_class(
            aside,
            "fold",
            /*$isSidebarFold*/
            ctx[2] || /*windowWidth*/
            ctx[1] < 950
          );
        },
        m(target, anchor) {
          insert(target, aside, anchor);
          append(aside, div4);
          append(div4, div0);
          append(div4, t0);
          append(div4, div3);
          append(div3, div1);
          append(div3, t2);
          append(div3, div2);
          append(div2, button);
          append(aside, t4);
          append(aside, hr0);
          append(aside, t5);
          append(aside, div5);
          append(div5, ul);
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            if (each_blocks[i2]) {
              each_blocks[i2].m(ul, null);
            }
          }
          append(aside, t6);
          append(aside, hr1);
          append(aside, t7);
          append(aside, div6);
          if (!mounted) {
            dispose = listen(button, "click", stop_propagation(
              /*handleMenuOpen*/
              ctx[4]
            ));
            mounted = true;
          }
        },
        p(ctx2, [dirty]) {
          if (dirty & /*$selectedMenu, sidebar, push*/
          9) {
            each_value = /*sidebar*/
            ctx2[0];
            let i2;
            for (i2 = 0; i2 < each_value.length; i2 += 1) {
              const child_ctx = get_each_context$5(ctx2, each_value, i2);
              if (each_blocks[i2]) {
                each_blocks[i2].p(child_ctx, dirty);
              } else {
                each_blocks[i2] = create_each_block$5(child_ctx);
                each_blocks[i2].c();
                each_blocks[i2].m(ul, null);
              }
            }
            for (; i2 < each_blocks.length; i2 += 1) {
              each_blocks[i2].d(1);
            }
            each_blocks.length = each_value.length;
          }
          if (dirty & /*$isSidebarFold, windowWidth*/
          6) {
            toggle_class(
              aside,
              "fold",
              /*$isSidebarFold*/
              ctx2[2] || /*windowWidth*/
              ctx2[1] < 950
            );
          }
        },
        i: noop,
        o: noop,
        d(detaching) {
          if (detaching)
            detach(aside);
          destroy_each(each_blocks, detaching);
          mounted = false;
          dispose();
        }
      };
    }
    function instance$a($$self, $$props, $$invalidate) {
      let $isSidebarFold;
      let $selectedMenu;
      component_subscribe($$self, isSidebarFold, ($$value) => $$invalidate(2, $isSidebarFold = $$value));
      component_subscribe($$self, selectedMenu, ($$value) => $$invalidate(3, $selectedMenu = $$value));
      const sidebar = [{ name: "Instagram", href: "/instagram" }];
      location$1.subscribe((value) => {
        selectedMenu.set(value);
      });
      let windowWidth = window.innerWidth;
      function updateSize() {
        $$invalidate(1, windowWidth = window.innerWidth);
      }
      window.addEventListener("resize", updateSize);
      let menuOpen = false;
      function handleMenuOpen() {
        menuOpen = !menuOpen;
        if (menuOpen) {
          document.body.addEventListener("click", handleMenuClose);
        } else {
          document.body.removeEventListener("click", handleMenuClose);
        }
      }
      function handleMenuClose() {
        menuOpen = false;
        document.body.removeEventListener("click", handleMenuClose);
      }
      const click_handler2 = (href) => {
        push(href);
      };
      return [
        sidebar,
        windowWidth,
        $isSidebarFold,
        $selectedMenu,
        handleMenuOpen,
        click_handler2
      ];
    }
    class Sidebar extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$a, create_fragment$b, safe_not_equal, { sidebar: 0 });
      }
      get sidebar() {
        return this.$$.ctx[0];
      }
    }
    class Api {
      constructor(prefix) {
        this.URL_PREFIX = prefix;
        this.API_URL = "http://influencer.diffday.org:8070";
        this.api = createHttpClient(`${this.API_URL}/api`);
      }
      getAll() {
        return __async(this, null, function* () {
          const [error, res] = yield handle(this.api.doGet(`${this.URL_PREFIX}`));
          if (error) {
            return this.rejectAPI(error, "getAll");
          }
          return res.data;
        });
      }
      getExcelLink() {
        return `${this.API_URL}/api/admin${this.URL_PREFIX}/excel?Authorization=${api$1.get("Authorization")}`;
      }
      getById() {
        return __async(this, null, function* () {
        });
      }
      save(data) {
        return __async(this, null, function* () {
          const [error, res] = yield handle(
            this.api.doPost(`${this.URL_PREFIX}`, {
              body: JSON.stringify(data)
            })
          );
          if (error) {
            return this.rejectAPI(error, "save");
          }
          return res;
        });
      }
      deleteById(id) {
        return __async(this, null, function* () {
          const [error, res] = yield handle(this.api.doDelete(`${this.URL_PREFIX}/${id}`));
          if (error) {
            return this.rejectAPI(error, "delete");
          }
          return res;
        });
      }
      uploadExcel(file) {
        return __async(this, null, function* () {
          var form = new FormData();
          form.append("file", file);
          const [error, res] = yield handle(this.api.doPostForm(`${this.URL_PREFIX}/excel`, { body: form }));
          if (error) {
            return this.rejectAPI(error, "uploadExcel");
          }
          return res;
        });
      }
      readErrorMessage(error) {
        return __async(this, null, function* () {
          return error.text ? yield error == null ? void 0 : error.text() : error;
        });
      }
      rejectAPI(error, kind) {
        return __async(this, null, function* () {
          const errorMessage = yield this.readErrorMessage(error);
          const message = errorMessage ? JSON.parse(errorMessage).message : "";
          console.error(`[ALARM-${error.status}] ${kind} - ${errorMessage}`);
          return { status: error.status, message };
        });
      }
    }
    class InstagramApi extends Api {
      constructor() {
        super("/instagram");
      }
      getAllByOptions(options) {
        return __async(this, null, function* () {
          const params2 = new URLSearchParams(options).toString();
          const [error, res] = yield handle(this.api.doGet(`${this.URL_PREFIX}/influencer?${params2}`));
          console.log(res);
          if (error) {
            return this.rejectAPI(error, "getAllByOptions");
          }
          return res;
        });
      }
    }
    const instagramApi = new InstagramApi();
    const PageController_svelte_svelte_type_style_lang = "";
    function get_each_context$4(ctx, list, i2) {
      const child_ctx = ctx.slice();
      child_ctx[8] = list[i2];
      return child_ctx;
    }
    function create_else_block$2(ctx) {
      let li;
      let a2;
      let t0_value = (
        /*page*/
        ctx[8] + ""
      );
      let t0;
      let t1;
      let mounted;
      let dispose;
      function click_handler2() {
        return (
          /*click_handler*/
          ctx[5](
            /*page*/
            ctx[8]
          )
        );
      }
      return {
        c() {
          li = element("li");
          a2 = element("a");
          t0 = text(t0_value);
          t1 = space();
          attr(a2, "class", "page-link");
          attr(li, "class", "page-item svelte-g0tjii");
        },
        m(target, anchor) {
          insert(target, li, anchor);
          append(li, a2);
          append(a2, t0);
          append(li, t1);
          if (!mounted) {
            dispose = listen(a2, "click", click_handler2);
            mounted = true;
          }
        },
        p(new_ctx, dirty) {
          ctx = new_ctx;
          if (dirty & /*pageRange*/
          2 && t0_value !== (t0_value = /*page*/
          ctx[8] + ""))
            set_data(t0, t0_value);
        },
        d(detaching) {
          if (detaching)
            detach(li);
          mounted = false;
          dispose();
        }
      };
    }
    function create_if_block$4(ctx) {
      let li;
      let a2;
      let t0_value = (
        /*page*/
        ctx[8] + ""
      );
      let t0;
      let t1;
      return {
        c() {
          li = element("li");
          a2 = element("a");
          t0 = text(t0_value);
          t1 = space();
          attr(a2, "class", "page-link");
          attr(li, "class", "page-item active svelte-g0tjii");
        },
        m(target, anchor) {
          insert(target, li, anchor);
          append(li, a2);
          append(a2, t0);
          append(li, t1);
        },
        p(ctx2, dirty) {
          if (dirty & /*pageRange*/
          2 && t0_value !== (t0_value = /*page*/
          ctx2[8] + ""))
            set_data(t0, t0_value);
        },
        d(detaching) {
          if (detaching)
            detach(li);
        }
      };
    }
    function create_each_block$4(ctx) {
      let if_block_anchor;
      function select_block_type(ctx2, dirty) {
        if (
          /*page*/
          ctx2[8] === /*currentPage*/
          ctx2[0] + 1
        )
          return create_if_block$4;
        return create_else_block$2;
      }
      let current_block_type = select_block_type(ctx);
      let if_block = current_block_type(ctx);
      return {
        c() {
          if_block.c();
          if_block_anchor = empty();
        },
        m(target, anchor) {
          if_block.m(target, anchor);
          insert(target, if_block_anchor, anchor);
        },
        p(ctx2, dirty) {
          if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block) {
            if_block.p(ctx2, dirty);
          } else {
            if_block.d(1);
            if_block = current_block_type(ctx2);
            if (if_block) {
              if_block.c();
              if_block.m(if_block_anchor.parentNode, if_block_anchor);
            }
          }
        },
        d(detaching) {
          if_block.d(detaching);
          if (detaching)
            detach(if_block_anchor);
        }
      };
    }
    function create_fragment$a(ctx) {
      let div;
      let nav;
      let ul;
      let each_value = (
        /*pageRange*/
        ctx[1]
      );
      let each_blocks = [];
      for (let i2 = 0; i2 < each_value.length; i2 += 1) {
        each_blocks[i2] = create_each_block$4(get_each_context$4(ctx, each_value, i2));
      }
      return {
        c() {
          div = element("div");
          nav = element("nav");
          ul = element("ul");
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            each_blocks[i2].c();
          }
          attr(ul, "class", "pagination");
          attr(nav, "aria-label", "Page navigation example");
          attr(div, "class", "d-flex justify-content-center");
        },
        m(target, anchor) {
          insert(target, div, anchor);
          append(div, nav);
          append(nav, ul);
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            if (each_blocks[i2]) {
              each_blocks[i2].m(ul, null);
            }
          }
        },
        p(ctx2, [dirty]) {
          if (dirty & /*pageRange, currentPage, movePage*/
          7) {
            each_value = /*pageRange*/
            ctx2[1];
            let i2;
            for (i2 = 0; i2 < each_value.length; i2 += 1) {
              const child_ctx = get_each_context$4(ctx2, each_value, i2);
              if (each_blocks[i2]) {
                each_blocks[i2].p(child_ctx, dirty);
              } else {
                each_blocks[i2] = create_each_block$4(child_ctx);
                each_blocks[i2].c();
                each_blocks[i2].m(ul, null);
              }
            }
            for (; i2 < each_blocks.length; i2 += 1) {
              each_blocks[i2].d(1);
            }
            each_blocks.length = each_value.length;
          }
        },
        i: noop,
        o: noop,
        d(detaching) {
          if (detaching)
            detach(div);
          destroy_each(each_blocks, detaching);
        }
      };
    }
    function instance$9($$self, $$props, $$invalidate) {
      let { totalPage = 1 } = $$props;
      let { currentPage = 1 } = $$props;
      let { pageHandler = (page) => {
      } } = $$props;
      let pageRange = getPageRange();
      function getPageRange(cp) {
        const range = [];
        let startPage = Math.max(currentPage - 3, 1);
        let endPage = Math.min(currentPage + 3, totalPage);
        if (startPage > 1) {
          range.push("<<");
          range.push("<");
        }
        for (let i2 = startPage; i2 <= endPage; i2++) {
          range.push(i2);
        }
        if (endPage < totalPage) {
          range.push(">");
          range.push(">>");
        }
        return range;
      }
      function movePage(page) {
        if (page === "<<") {
          goPage(1);
        } else if (page === "<") {
          goPage(currentPage - 1);
        } else if (page === ">") {
          goPage(currentPage + 1);
        } else if (page === ">>") {
          goPage(totalPage);
        } else {
          goPage(page);
        }
      }
      function goPage(page) {
        pageHandler(page - 1);
      }
      const click_handler2 = (page) => movePage(page);
      $$self.$$set = ($$props2) => {
        if ("totalPage" in $$props2)
          $$invalidate(3, totalPage = $$props2.totalPage);
        if ("currentPage" in $$props2)
          $$invalidate(0, currentPage = $$props2.currentPage);
        if ("pageHandler" in $$props2)
          $$invalidate(4, pageHandler = $$props2.pageHandler);
      };
      $$self.$$.update = () => {
        if ($$self.$$.dirty & /*currentPage*/
        1) {
          $$invalidate(1, pageRange = getPageRange());
        }
      };
      return [currentPage, pageRange, movePage, totalPage, pageHandler, click_handler2];
    }
    class PageController extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$9, create_fragment$a, safe_not_equal, {
          totalPage: 3,
          currentPage: 0,
          pageHandler: 4
        });
      }
    }
    const PagingTable_svelte_svelte_type_style_lang = "";
    function get_each_context$3(ctx, list, i2) {
      const child_ctx = ctx.slice();
      child_ctx[17] = list[i2];
      child_ctx[20] = i2;
      const constants_0 = (
        /*body*/
        child_ctx[2][
          /*idx*/
          child_ctx[20]
        ]
      );
      child_ctx[18] = constants_0;
      return child_ctx;
    }
    function get_each_context_1(ctx, list, i2) {
      const child_ctx = ctx.slice();
      child_ctx[21] = list[i2];
      return child_ctx;
    }
    function get_each_context_2(ctx, list, i2) {
      const child_ctx = ctx.slice();
      child_ctx[21] = list[i2];
      return child_ctx;
    }
    function create_each_block_2(ctx) {
      let sortableth;
      let current;
      sortableth = new SortableTh({
        props: {
          name: (
            /*key*/
            ctx[21].name
          ),
          sortable: (
            /*key*/
            ctx[21].sortable
          ),
          key: (
            /*key*/
            ctx[21].key
          ),
          changeDirection: (
            /*sort*/
            ctx[9]
          ),
          selectedKey: sortKey
        }
      });
      return {
        c() {
          create_component(sortableth.$$.fragment);
        },
        m(target, anchor) {
          mount_component(sortableth, target, anchor);
          current = true;
        },
        p(ctx2, dirty) {
          const sortableth_changes = {};
          if (dirty & /*head*/
          2)
            sortableth_changes.name = /*key*/
            ctx2[21].name;
          if (dirty & /*head*/
          2)
            sortableth_changes.sortable = /*key*/
            ctx2[21].sortable;
          if (dirty & /*head*/
          2)
            sortableth_changes.key = /*key*/
            ctx2[21].key;
          sortableth.$set(sortableth_changes);
        },
        i(local) {
          if (current)
            return;
          transition_in(sortableth.$$.fragment, local);
          current = true;
        },
        o(local) {
          transition_out(sortableth.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          destroy_component(sortableth, detaching);
        }
      };
    }
    function create_if_block_11(ctx) {
      let th;
      return {
        c() {
          th = element("th");
          th.textContent = "삭제";
        },
        m(target, anchor) {
          insert(target, th, anchor);
        },
        d(detaching) {
          if (detaching)
            detach(th);
        }
      };
    }
    function create_else_block$1(ctx) {
      let each_1_anchor;
      let current;
      let each_value = { length: (
        /*body*/
        ctx[2].length
      ) };
      let each_blocks = [];
      for (let i2 = 0; i2 < each_value.length; i2 += 1) {
        each_blocks[i2] = create_each_block$3(get_each_context$3(ctx, each_value, i2));
      }
      const out = (i2) => transition_out(each_blocks[i2], 1, 1, () => {
        each_blocks[i2] = null;
      });
      return {
        c() {
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            each_blocks[i2].c();
          }
          each_1_anchor = empty();
        },
        m(target, anchor) {
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            if (each_blocks[i2]) {
              each_blocks[i2].m(target, anchor);
            }
          }
          insert(target, each_1_anchor, anchor);
          current = true;
        },
        p(ctx2, dirty) {
          if (dirty & /*selectedIdx, onClickData, body, deleteItem, idHead, options, head, undefined*/
          1327) {
            each_value = { length: (
              /*body*/
              ctx2[2].length
            ) };
            let i2;
            for (i2 = 0; i2 < each_value.length; i2 += 1) {
              const child_ctx = get_each_context$3(ctx2, each_value, i2);
              if (each_blocks[i2]) {
                each_blocks[i2].p(child_ctx, dirty);
                transition_in(each_blocks[i2], 1);
              } else {
                each_blocks[i2] = create_each_block$3(child_ctx);
                each_blocks[i2].c();
                transition_in(each_blocks[i2], 1);
                each_blocks[i2].m(each_1_anchor.parentNode, each_1_anchor);
              }
            }
            group_outros();
            for (i2 = each_value.length; i2 < each_blocks.length; i2 += 1) {
              out(i2);
            }
            check_outros();
          }
        },
        i(local) {
          if (current)
            return;
          for (let i2 = 0; i2 < each_value.length; i2 += 1) {
            transition_in(each_blocks[i2]);
          }
          current = true;
        },
        o(local) {
          each_blocks = each_blocks.filter(Boolean);
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            transition_out(each_blocks[i2]);
          }
          current = false;
        },
        d(detaching) {
          destroy_each(each_blocks, detaching);
          if (detaching)
            detach(each_1_anchor);
        }
      };
    }
    function create_if_block$3(ctx) {
      let t0;
      let t1;
      let tr;
      let td;
      let t2;
      let td_colspan_value;
      return {
        c() {
          t0 = text(
            /*body*/
            ctx[2]
          );
          t1 = space();
          tr = element("tr");
          td = element("td");
          t2 = text("데이터가 없습니다.");
          attr(td, "colspan", td_colspan_value = /*head*/
          ctx[1].length);
          set_style(td, "text-align", "center");
          set_style(td, "vertical-align", "middle");
          set_style(td, "height", "100px");
          attr(td, "class", "svelte-1e747dv");
        },
        m(target, anchor) {
          insert(target, t0, anchor);
          insert(target, t1, anchor);
          insert(target, tr, anchor);
          append(tr, td);
          append(td, t2);
        },
        p(ctx2, dirty) {
          if (dirty & /*body*/
          4)
            set_data(
              t0,
              /*body*/
              ctx2[2]
            );
          if (dirty & /*head*/
          2 && td_colspan_value !== (td_colspan_value = /*head*/
          ctx2[1].length)) {
            attr(td, "colspan", td_colspan_value);
          }
        },
        i: noop,
        o: noop,
        d(detaching) {
          if (detaching)
            detach(t0);
          if (detaching)
            detach(t1);
          if (detaching)
            detach(tr);
        }
      };
    }
    function create_else_block_1(ctx) {
      var _a;
      let t_value = (
        /*data*/
        ((_a = ctx[18][
          /*key*/
          ctx[21].key
        ]) != null ? _a : "") + ""
      );
      let t2;
      return {
        c() {
          t2 = text(t_value);
        },
        m(target, anchor) {
          insert(target, t2, anchor);
        },
        p(ctx2, dirty) {
          var _a2;
          if (dirty & /*body, head*/
          6 && t_value !== (t_value = /*data*/
          ((_a2 = ctx2[18][
            /*key*/
            ctx2[21].key
          ]) != null ? _a2 : "") + ""))
            set_data(t2, t_value);
        },
        i: noop,
        o: noop,
        d(detaching) {
          if (detaching)
            detach(t2);
        }
      };
    }
    function create_if_block_10(ctx) {
      let img;
      let img_src_value;
      return {
        c() {
          img = element("img");
          if (!src_url_equal(img.src, img_src_value = /*data*/
          ctx[18][
            /*key*/
            ctx[21].key
          ]))
            attr(img, "src", img_src_value);
          set_style(img, "width", "100px");
          set_style(img, "height", "100px");
          attr(img, "alt", "");
        },
        m(target, anchor) {
          insert(target, img, anchor);
        },
        p(ctx2, dirty) {
          if (dirty & /*body, head*/
          6 && !src_url_equal(img.src, img_src_value = /*data*/
          ctx2[18][
            /*key*/
            ctx2[21].key
          ])) {
            attr(img, "src", img_src_value);
          }
        },
        i: noop,
        o: noop,
        d(detaching) {
          if (detaching)
            detach(img);
        }
      };
    }
    function create_if_block_9(ctx) {
      let button;
      let current;
      button = new Button({ props: { text: (
        /*key*/
        ctx[21].name
      ) } });
      button.$on("click", function() {
        if (is_function(
          /*key*/
          ctx[21].onClick(
            /*data*/
            ctx[18]
          )
        ))
          ctx[21].onClick(
            /*data*/
            ctx[18]
          ).apply(this, arguments);
      });
      return {
        c() {
          create_component(button.$$.fragment);
        },
        m(target, anchor) {
          mount_component(button, target, anchor);
          current = true;
        },
        p(new_ctx, dirty) {
          ctx = new_ctx;
          const button_changes = {};
          if (dirty & /*head*/
          2)
            button_changes.text = /*key*/
            ctx[21].name;
          button.$set(button_changes);
        },
        i(local) {
          if (current)
            return;
          transition_in(button.$$.fragment, local);
          current = true;
        },
        o(local) {
          transition_out(button.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          destroy_component(button, detaching);
        }
      };
    }
    function create_if_block_8$1(ctx) {
      let html_tag;
      let raw_value = (
        /*key*/
        ctx[21].defaultHtml + ""
      );
      let html_anchor;
      return {
        c() {
          html_tag = new HtmlTag(false);
          html_anchor = empty();
          html_tag.a = html_anchor;
        },
        m(target, anchor) {
          html_tag.m(raw_value, target, anchor);
          insert(target, html_anchor, anchor);
        },
        p(ctx2, dirty) {
          if (dirty & /*head*/
          2 && raw_value !== (raw_value = /*key*/
          ctx2[21].defaultHtml + ""))
            html_tag.p(raw_value);
        },
        i: noop,
        o: noop,
        d(detaching) {
          if (detaching)
            detach(html_anchor);
          if (detaching)
            html_tag.d();
        }
      };
    }
    function create_if_block_7$1(ctx) {
      let color2;
      let current;
      color2 = new Color({
        props: {
          value: (
            /*data*/
            ctx[18][
              /*key*/
              ctx[21].key
            ]
          )
        }
      });
      return {
        c() {
          create_component(color2.$$.fragment);
        },
        m(target, anchor) {
          mount_component(color2, target, anchor);
          current = true;
        },
        p(ctx2, dirty) {
          const color_changes = {};
          if (dirty & /*body, head*/
          6)
            color_changes.value = /*data*/
            ctx2[18][
              /*key*/
              ctx2[21].key
            ];
          color2.$set(color_changes);
        },
        i(local) {
          if (current)
            return;
          transition_in(color2.$$.fragment, local);
          current = true;
        },
        o(local) {
          transition_out(color2.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          destroy_component(color2, detaching);
        }
      };
    }
    function create_if_block_6$1(ctx) {
      let t_value = (
        /*data*/
        ctx[18][
          /*key*/
          ctx[21].key
        ].toLocaleString() + ""
      );
      let t2;
      return {
        c() {
          t2 = text(t_value);
        },
        m(target, anchor) {
          insert(target, t2, anchor);
        },
        p(ctx2, dirty) {
          if (dirty & /*body, head*/
          6 && t_value !== (t_value = /*data*/
          ctx2[18][
            /*key*/
            ctx2[21].key
          ].toLocaleString() + ""))
            set_data(t2, t_value);
        },
        i: noop,
        o: noop,
        d(detaching) {
          if (detaching)
            detach(t2);
        }
      };
    }
    function create_if_block_5$1(ctx) {
      let t_value = (
        /*data*/
        ctx[18][
          /*key*/
          ctx[21].key
        ].split("T")[0] + ""
      );
      let t2;
      return {
        c() {
          t2 = text(t_value);
        },
        m(target, anchor) {
          insert(target, t2, anchor);
        },
        p(ctx2, dirty) {
          if (dirty & /*body, head*/
          6 && t_value !== (t_value = /*data*/
          ctx2[18][
            /*key*/
            ctx2[21].key
          ].split("T")[0] + ""))
            set_data(t2, t_value);
        },
        i: noop,
        o: noop,
        d(detaching) {
          if (detaching)
            detach(t2);
        }
      };
    }
    function create_if_block_4$1(ctx) {
      let t_value = (
        /*data*/
        ctx[18][
          /*key*/
          ctx[21].key
        ].join(", ") + ""
      );
      let t2;
      return {
        c() {
          t2 = text(t_value);
        },
        m(target, anchor) {
          insert(target, t2, anchor);
        },
        p(ctx2, dirty) {
          if (dirty & /*body, head*/
          6 && t_value !== (t_value = /*data*/
          ctx2[18][
            /*key*/
            ctx2[21].key
          ].join(", ") + ""))
            set_data(t2, t_value);
        },
        i: noop,
        o: noop,
        d(detaching) {
          if (detaching)
            detach(t2);
        }
      };
    }
    function create_if_block_3$1(ctx) {
      let status;
      let current;
      status = new Status({
        props: {
          status: (
            /*data*/
            ctx[18][
              /*key*/
              ctx[21].key
            ]
          )
        }
      });
      return {
        c() {
          create_component(status.$$.fragment);
        },
        m(target, anchor) {
          mount_component(status, target, anchor);
          current = true;
        },
        p(ctx2, dirty) {
          const status_changes = {};
          if (dirty & /*body, head*/
          6)
            status_changes.status = /*data*/
            ctx2[18][
              /*key*/
              ctx2[21].key
            ];
          status.$set(status_changes);
        },
        i(local) {
          if (current)
            return;
          transition_in(status.$$.fragment, local);
          current = true;
        },
        o(local) {
          transition_out(status.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          destroy_component(status, detaching);
        }
      };
    }
    function create_each_block_1(ctx) {
      let td;
      let span;
      let current_block_type_index;
      let if_block;
      let span_style_value;
      let current;
      const if_block_creators = [
        create_if_block_3$1,
        create_if_block_4$1,
        create_if_block_5$1,
        create_if_block_6$1,
        create_if_block_7$1,
        create_if_block_8$1,
        create_if_block_9,
        create_if_block_10,
        create_else_block_1
      ];
      const if_blocks = [];
      function select_block_type_1(ctx2, dirty) {
        if (
          /*key*/
          ctx2[21].type === "status"
        )
          return 0;
        if (
          /*key*/
          ctx2[21].type === "list"
        )
          return 1;
        if (
          /*key*/
          ctx2[21].type === "date"
        )
          return 2;
        if (
          /*key*/
          ctx2[21].type === "number"
        )
          return 3;
        if (
          /*key*/
          ctx2[21].type === "color"
        )
          return 4;
        if (
          /*key*/
          ctx2[21].defaultHtml !== void 0
        )
          return 5;
        if (
          /*key*/
          ctx2[21].type === "button"
        )
          return 6;
        if (
          /*key*/
          ctx2[21].type === "image"
        )
          return 7;
        return 8;
      }
      current_block_type_index = select_block_type_1(ctx);
      if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
      return {
        c() {
          td = element("td");
          span = element("span");
          if_block.c();
          attr(span, "style", span_style_value = /*key*/
          ctx[21].selectedOnClick !== void 0 ? "cursor: pointer" : "");
          attr(td, "class", "svelte-1e747dv");
        },
        m(target, anchor) {
          insert(target, td, anchor);
          append(td, span);
          if_blocks[current_block_type_index].m(span, null);
          current = true;
        },
        p(ctx2, dirty) {
          let previous_block_index = current_block_type_index;
          current_block_type_index = select_block_type_1(ctx2);
          if (current_block_type_index === previous_block_index) {
            if_blocks[current_block_type_index].p(ctx2, dirty);
          } else {
            group_outros();
            transition_out(if_blocks[previous_block_index], 1, 1, () => {
              if_blocks[previous_block_index] = null;
            });
            check_outros();
            if_block = if_blocks[current_block_type_index];
            if (!if_block) {
              if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
              if_block.c();
            } else {
              if_block.p(ctx2, dirty);
            }
            transition_in(if_block, 1);
            if_block.m(span, null);
          }
          if (!current || dirty & /*head*/
          2 && span_style_value !== (span_style_value = /*key*/
          ctx2[21].selectedOnClick !== void 0 ? "cursor: pointer" : "")) {
            attr(span, "style", span_style_value);
          }
        },
        i(local) {
          if (current)
            return;
          transition_in(if_block);
          current = true;
        },
        o(local) {
          transition_out(if_block);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(td);
          if_blocks[current_block_type_index].d();
        }
      };
    }
    function create_if_block_1$1(ctx) {
      let td;
      let show_if = (
        /*options*/
        ctx[5].deletableHandler(
          /*data*/
          ctx[18]
        )
      );
      let current;
      let if_block = show_if && create_if_block_2$1(ctx);
      return {
        c() {
          td = element("td");
          if (if_block)
            if_block.c();
          attr(td, "onclick", "event.stopPropagation()");
          attr(td, "class", "svelte-1e747dv");
        },
        m(target, anchor) {
          insert(target, td, anchor);
          if (if_block)
            if_block.m(td, null);
          current = true;
        },
        p(ctx2, dirty) {
          if (dirty & /*options, body*/
          36)
            show_if = /*options*/
            ctx2[5].deletableHandler(
              /*data*/
              ctx2[18]
            );
          if (show_if) {
            if (if_block) {
              if_block.p(ctx2, dirty);
              if (dirty & /*options, body*/
              36) {
                transition_in(if_block, 1);
              }
            } else {
              if_block = create_if_block_2$1(ctx2);
              if_block.c();
              transition_in(if_block, 1);
              if_block.m(td, null);
            }
          } else if (if_block) {
            group_outros();
            transition_out(if_block, 1, 1, () => {
              if_block = null;
            });
            check_outros();
          }
        },
        i(local) {
          if (current)
            return;
          transition_in(if_block);
          current = true;
        },
        o(local) {
          transition_out(if_block);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(td);
          if (if_block)
            if_block.d();
        }
      };
    }
    function create_if_block_2$1(ctx) {
      let deletemodal;
      let current;
      deletemodal = new DeleteModal({
        props: {
          deleteHandler: (
            /*deleteItem*/
            ctx[10]
          ),
          item: (
            /*data*/
            ctx[18]
          ),
          name: (
            /*data*/
            ctx[18][
              /*idHead*/
              ctx[3]
            ]
          )
        }
      });
      return {
        c() {
          create_component(deletemodal.$$.fragment);
        },
        m(target, anchor) {
          mount_component(deletemodal, target, anchor);
          current = true;
        },
        p(ctx2, dirty) {
          const deletemodal_changes = {};
          if (dirty & /*body*/
          4)
            deletemodal_changes.item = /*data*/
            ctx2[18];
          if (dirty & /*body, idHead*/
          12)
            deletemodal_changes.name = /*data*/
            ctx2[18][
              /*idHead*/
              ctx2[3]
            ];
          deletemodal.$set(deletemodal_changes);
        },
        i(local) {
          if (current)
            return;
          transition_in(deletemodal.$$.fragment, local);
          current = true;
        },
        o(local) {
          transition_out(deletemodal.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          destroy_component(deletemodal, detaching);
        }
      };
    }
    function create_each_block$3(ctx) {
      let tr;
      let t0;
      let t1;
      let current;
      let mounted;
      let dispose;
      let each_value_1 = (
        /*head*/
        ctx[1]
      );
      let each_blocks = [];
      for (let i2 = 0; i2 < each_value_1.length; i2 += 1) {
        each_blocks[i2] = create_each_block_1(get_each_context_1(ctx, each_value_1, i2));
      }
      const out = (i2) => transition_out(each_blocks[i2], 1, 1, () => {
        each_blocks[i2] = null;
      });
      let if_block = (
        /*options*/
        ctx[5].deletable && create_if_block_1$1(ctx)
      );
      function click_handler2(...args) {
        return (
          /*click_handler*/
          ctx[15](
            /*idx*/
            ctx[20],
            /*data*/
            ctx[18],
            ...args
          )
        );
      }
      return {
        c() {
          tr = element("tr");
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            each_blocks[i2].c();
          }
          t0 = space();
          if (if_block)
            if_block.c();
          t1 = space();
          set_style(tr, "cursor", "pointer");
          toggle_class(
            tr,
            "table-active",
            /*selectedIdx*/
            ctx[0] === /*idx*/
            ctx[20]
          );
        },
        m(target, anchor) {
          insert(target, tr, anchor);
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            if (each_blocks[i2]) {
              each_blocks[i2].m(tr, null);
            }
          }
          append(tr, t0);
          if (if_block)
            if_block.m(tr, null);
          append(tr, t1);
          current = true;
          if (!mounted) {
            dispose = listen(tr, "click", click_handler2);
            mounted = true;
          }
        },
        p(new_ctx, dirty) {
          ctx = new_ctx;
          if (dirty & /*head, undefined, body*/
          6) {
            each_value_1 = /*head*/
            ctx[1];
            let i2;
            for (i2 = 0; i2 < each_value_1.length; i2 += 1) {
              const child_ctx = get_each_context_1(ctx, each_value_1, i2);
              if (each_blocks[i2]) {
                each_blocks[i2].p(child_ctx, dirty);
                transition_in(each_blocks[i2], 1);
              } else {
                each_blocks[i2] = create_each_block_1(child_ctx);
                each_blocks[i2].c();
                transition_in(each_blocks[i2], 1);
                each_blocks[i2].m(tr, t0);
              }
            }
            group_outros();
            for (i2 = each_value_1.length; i2 < each_blocks.length; i2 += 1) {
              out(i2);
            }
            check_outros();
          }
          if (
            /*options*/
            ctx[5].deletable
          ) {
            if (if_block) {
              if_block.p(ctx, dirty);
              if (dirty & /*options*/
              32) {
                transition_in(if_block, 1);
              }
            } else {
              if_block = create_if_block_1$1(ctx);
              if_block.c();
              transition_in(if_block, 1);
              if_block.m(tr, t1);
            }
          } else if (if_block) {
            group_outros();
            transition_out(if_block, 1, 1, () => {
              if_block = null;
            });
            check_outros();
          }
          if (!current || dirty & /*selectedIdx*/
          1) {
            toggle_class(
              tr,
              "table-active",
              /*selectedIdx*/
              ctx[0] === /*idx*/
              ctx[20]
            );
          }
        },
        i(local) {
          if (current)
            return;
          for (let i2 = 0; i2 < each_value_1.length; i2 += 1) {
            transition_in(each_blocks[i2]);
          }
          transition_in(if_block);
          current = true;
        },
        o(local) {
          each_blocks = each_blocks.filter(Boolean);
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            transition_out(each_blocks[i2]);
          }
          transition_out(if_block);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(tr);
          destroy_each(each_blocks, detaching);
          if (if_block)
            if_block.d();
          mounted = false;
          dispose();
        }
      };
    }
    function create_fragment$9(ctx) {
      let div;
      let table;
      let thead;
      let tr;
      let t0;
      let t1;
      let tbody;
      let current_block_type_index;
      let if_block1;
      let div_class_value;
      let t2;
      let pagecontroller;
      let current;
      let each_value_2 = (
        /*head*/
        ctx[1]
      );
      let each_blocks = [];
      for (let i2 = 0; i2 < each_value_2.length; i2 += 1) {
        each_blocks[i2] = create_each_block_2(get_each_context_2(ctx, each_value_2, i2));
      }
      const out = (i2) => transition_out(each_blocks[i2], 1, 1, () => {
        each_blocks[i2] = null;
      });
      let if_block0 = (
        /*options*/
        ctx[5].deletable && create_if_block_11()
      );
      const if_block_creators = [create_if_block$3, create_else_block$1];
      const if_blocks = [];
      function select_block_type(ctx2, dirty) {
        if (
          /*body*/
          ctx2[2].length === 0
        )
          return 0;
        return 1;
      }
      current_block_type_index = select_block_type(ctx);
      if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
      pagecontroller = new PageController({
        props: {
          totalPage: (
            /*pageInfo*/
            ctx[6].totalPage
          ),
          currentPage: (
            /*pageInfo*/
            ctx[6].page
          ),
          pageHandler: (
            /*pageHandler*/
            ctx[11]
          )
        }
      });
      return {
        c() {
          div = element("div");
          table = element("table");
          thead = element("thead");
          tr = element("tr");
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            each_blocks[i2].c();
          }
          t0 = space();
          if (if_block0)
            if_block0.c();
          t1 = space();
          tbody = element("tbody");
          if_block1.c();
          t2 = space();
          create_component(pagecontroller.$$.fragment);
          set_style(tr, "background", "rgb(52, 48, 48)");
          set_style(tr, "color", "white");
          attr(table, "class", "table w-90 mx-auto mt-3 table-hover");
          attr(div, "class", div_class_value = /*tableHeight*/
          ctx[4] + " table-responsive");
        },
        m(target, anchor) {
          insert(target, div, anchor);
          append(div, table);
          append(table, thead);
          append(thead, tr);
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            if (each_blocks[i2]) {
              each_blocks[i2].m(tr, null);
            }
          }
          append(tr, t0);
          if (if_block0)
            if_block0.m(tr, null);
          append(table, t1);
          append(table, tbody);
          if_blocks[current_block_type_index].m(tbody, null);
          ctx[16](div);
          insert(target, t2, anchor);
          mount_component(pagecontroller, target, anchor);
          current = true;
        },
        p(ctx2, [dirty]) {
          if (dirty & /*head, sort, sortKey*/
          514) {
            each_value_2 = /*head*/
            ctx2[1];
            let i2;
            for (i2 = 0; i2 < each_value_2.length; i2 += 1) {
              const child_ctx = get_each_context_2(ctx2, each_value_2, i2);
              if (each_blocks[i2]) {
                each_blocks[i2].p(child_ctx, dirty);
                transition_in(each_blocks[i2], 1);
              } else {
                each_blocks[i2] = create_each_block_2(child_ctx);
                each_blocks[i2].c();
                transition_in(each_blocks[i2], 1);
                each_blocks[i2].m(tr, t0);
              }
            }
            group_outros();
            for (i2 = each_value_2.length; i2 < each_blocks.length; i2 += 1) {
              out(i2);
            }
            check_outros();
          }
          if (
            /*options*/
            ctx2[5].deletable
          ) {
            if (if_block0)
              ;
            else {
              if_block0 = create_if_block_11();
              if_block0.c();
              if_block0.m(tr, null);
            }
          } else if (if_block0) {
            if_block0.d(1);
            if_block0 = null;
          }
          let previous_block_index = current_block_type_index;
          current_block_type_index = select_block_type(ctx2);
          if (current_block_type_index === previous_block_index) {
            if_blocks[current_block_type_index].p(ctx2, dirty);
          } else {
            group_outros();
            transition_out(if_blocks[previous_block_index], 1, 1, () => {
              if_blocks[previous_block_index] = null;
            });
            check_outros();
            if_block1 = if_blocks[current_block_type_index];
            if (!if_block1) {
              if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
              if_block1.c();
            } else {
              if_block1.p(ctx2, dirty);
            }
            transition_in(if_block1, 1);
            if_block1.m(tbody, null);
          }
          if (!current || dirty & /*tableHeight*/
          16 && div_class_value !== (div_class_value = /*tableHeight*/
          ctx2[4] + " table-responsive")) {
            attr(div, "class", div_class_value);
          }
          const pagecontroller_changes = {};
          if (dirty & /*pageInfo*/
          64)
            pagecontroller_changes.totalPage = /*pageInfo*/
            ctx2[6].totalPage;
          if (dirty & /*pageInfo*/
          64)
            pagecontroller_changes.currentPage = /*pageInfo*/
            ctx2[6].page;
          pagecontroller.$set(pagecontroller_changes);
        },
        i(local) {
          if (current)
            return;
          for (let i2 = 0; i2 < each_value_2.length; i2 += 1) {
            transition_in(each_blocks[i2]);
          }
          transition_in(if_block1);
          transition_in(pagecontroller.$$.fragment, local);
          current = true;
        },
        o(local) {
          each_blocks = each_blocks.filter(Boolean);
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            transition_out(each_blocks[i2]);
          }
          transition_out(if_block1);
          transition_out(pagecontroller.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(div);
          destroy_each(each_blocks, detaching);
          if (if_block0)
            if_block0.d();
          if_blocks[current_block_type_index].d();
          ctx[16](null);
          if (detaching)
            detach(t2);
          destroy_component(pagecontroller, detaching);
        }
      };
    }
    let sortKey = "";
    function instance$8($$self, $$props, $$invalidate) {
      let { head = [] } = $$props;
      let { body = [] } = $$props;
      let { idHead = "id" } = $$props;
      let { tableHeight = "h-100" } = $$props;
      let { refreshHandler = (opt) => {
      } } = $$props;
      let { clickHandler = () => {
      } } = $$props;
      let { queryOptions = {} } = $$props;
      let { options = {
        deletable: false,
        deletableHandler: (item) => {
          return !!item;
        },
        deleteHandler: () => {
        }
      } } = $$props;
      let { pageInfo = {} } = $$props;
      let element2;
      let { selectedIdx } = $$props;
      function onClickData(idx, data) {
        clickHandler(idx, data);
        $$invalidate(0, selectedIdx = idx);
      }
      function sort(key, direction, sortable) {
        if (!sortable)
          return;
        $$invalidate(12, queryOptions.property = key, queryOptions);
        $$invalidate(12, queryOptions.direction = direction, queryOptions);
        refreshHandler(queryOptions);
      }
      function deleteItem(item) {
        return __async(this, null, function* () {
          if (options.deletableHandler(item)) {
            yield options.deleteHandler(item);
            yield refreshHandler();
          }
        });
      }
      function pageHandler(page) {
        $$invalidate(12, queryOptions.page = page, queryOptions);
        refreshHandler(queryOptions);
      }
      const click_handler2 = (idx, data, e2) => {
        onClickData(idx, data);
      };
      function div_binding($$value) {
        binding_callbacks[$$value ? "unshift" : "push"](() => {
          element2 = $$value;
          $$invalidate(7, element2);
        });
      }
      $$self.$$set = ($$props2) => {
        if ("head" in $$props2)
          $$invalidate(1, head = $$props2.head);
        if ("body" in $$props2)
          $$invalidate(2, body = $$props2.body);
        if ("idHead" in $$props2)
          $$invalidate(3, idHead = $$props2.idHead);
        if ("tableHeight" in $$props2)
          $$invalidate(4, tableHeight = $$props2.tableHeight);
        if ("refreshHandler" in $$props2)
          $$invalidate(13, refreshHandler = $$props2.refreshHandler);
        if ("clickHandler" in $$props2)
          $$invalidate(14, clickHandler = $$props2.clickHandler);
        if ("queryOptions" in $$props2)
          $$invalidate(12, queryOptions = $$props2.queryOptions);
        if ("options" in $$props2)
          $$invalidate(5, options = $$props2.options);
        if ("pageInfo" in $$props2)
          $$invalidate(6, pageInfo = $$props2.pageInfo);
        if ("selectedIdx" in $$props2)
          $$invalidate(0, selectedIdx = $$props2.selectedIdx);
      };
      return [
        selectedIdx,
        head,
        body,
        idHead,
        tableHeight,
        options,
        pageInfo,
        element2,
        onClickData,
        sort,
        deleteItem,
        pageHandler,
        queryOptions,
        refreshHandler,
        clickHandler,
        click_handler2,
        div_binding
      ];
    }
    class PagingTable extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$8, create_fragment$9, safe_not_equal, {
          head: 1,
          body: 2,
          idHead: 3,
          tableHeight: 4,
          refreshHandler: 13,
          clickHandler: 14,
          queryOptions: 12,
          options: 5,
          pageInfo: 6,
          selectedIdx: 0
        });
      }
    }
    function create_if_block$2(ctx) {
      let div1;
      let div0;
      let button;
      let current;
      button = new Button({
        props: {
          text: (
            /*createLabel*/
            ctx[9]
          ),
          width: "15",
          style: "float:right; display: inline-block; margin-right: 50px"
        }
      });
      button.$on("click", function() {
        if (is_function(
          /*createHandler*/
          ctx[8]
        ))
          ctx[8].apply(this, arguments);
      });
      return {
        c() {
          div1 = element("div");
          div0 = element("div");
          create_component(button.$$.fragment);
          attr(div0, "class", "col-12");
          attr(div1, "class", "row");
        },
        m(target, anchor) {
          insert(target, div1, anchor);
          append(div1, div0);
          mount_component(button, div0, null);
          current = true;
        },
        p(new_ctx, dirty) {
          ctx = new_ctx;
          const button_changes = {};
          if (dirty & /*createLabel*/
          512)
            button_changes.text = /*createLabel*/
            ctx[9];
          button.$set(button_changes);
        },
        i(local) {
          if (current)
            return;
          transition_in(button.$$.fragment, local);
          current = true;
        },
        o(local) {
          transition_out(button.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(div1);
          destroy_component(button);
        }
      };
    }
    function create_fragment$8(ctx) {
      let search_1;
      let t0;
      let t1;
      let pagingtable;
      let current;
      search_1 = new Search({
        props: { updateHandler: (
          /*search*/
          ctx[13]
        ) }
      });
      let if_block = (
        /*creatable*/
        ctx[10] && create_if_block$2(ctx)
      );
      pagingtable = new PagingTable({
        props: {
          head: (
            /*head*/
            ctx[2]
          ),
          body: (
            /*body*/
            ctx[3]
          ),
          sortable: (
            /*sortable*/
            ctx[4]
          ),
          idHead: (
            /*idHead*/
            ctx[1]
          ),
          selectedIdx: (
            /*selectedIdx*/
            ctx[11]
          ),
          options: (
            /*options*/
            ctx[12]
          ),
          refreshHandler: (
            /*refreshHandler*/
            ctx[6]
          ),
          clickHandler: (
            /*clickHandler*/
            ctx[7]
          ),
          queryOptions: (
            /*queryOptions*/
            ctx[0]
          ),
          pageInfo: (
            /*pageInfo*/
            ctx[5]
          )
        }
      });
      return {
        c() {
          create_component(search_1.$$.fragment);
          t0 = space();
          if (if_block)
            if_block.c();
          t1 = space();
          create_component(pagingtable.$$.fragment);
        },
        m(target, anchor) {
          mount_component(search_1, target, anchor);
          insert(target, t0, anchor);
          if (if_block)
            if_block.m(target, anchor);
          insert(target, t1, anchor);
          mount_component(pagingtable, target, anchor);
          current = true;
        },
        p(ctx2, [dirty]) {
          if (
            /*creatable*/
            ctx2[10]
          ) {
            if (if_block) {
              if_block.p(ctx2, dirty);
              if (dirty & /*creatable*/
              1024) {
                transition_in(if_block, 1);
              }
            } else {
              if_block = create_if_block$2(ctx2);
              if_block.c();
              transition_in(if_block, 1);
              if_block.m(t1.parentNode, t1);
            }
          } else if (if_block) {
            group_outros();
            transition_out(if_block, 1, 1, () => {
              if_block = null;
            });
            check_outros();
          }
          const pagingtable_changes = {};
          if (dirty & /*head*/
          4)
            pagingtable_changes.head = /*head*/
            ctx2[2];
          if (dirty & /*body*/
          8)
            pagingtable_changes.body = /*body*/
            ctx2[3];
          if (dirty & /*sortable*/
          16)
            pagingtable_changes.sortable = /*sortable*/
            ctx2[4];
          if (dirty & /*idHead*/
          2)
            pagingtable_changes.idHead = /*idHead*/
            ctx2[1];
          if (dirty & /*selectedIdx*/
          2048)
            pagingtable_changes.selectedIdx = /*selectedIdx*/
            ctx2[11];
          if (dirty & /*options*/
          4096)
            pagingtable_changes.options = /*options*/
            ctx2[12];
          if (dirty & /*refreshHandler*/
          64)
            pagingtable_changes.refreshHandler = /*refreshHandler*/
            ctx2[6];
          if (dirty & /*clickHandler*/
          128)
            pagingtable_changes.clickHandler = /*clickHandler*/
            ctx2[7];
          if (dirty & /*queryOptions*/
          1)
            pagingtable_changes.queryOptions = /*queryOptions*/
            ctx2[0];
          if (dirty & /*pageInfo*/
          32)
            pagingtable_changes.pageInfo = /*pageInfo*/
            ctx2[5];
          pagingtable.$set(pagingtable_changes);
        },
        i(local) {
          if (current)
            return;
          transition_in(search_1.$$.fragment, local);
          transition_in(if_block);
          transition_in(pagingtable.$$.fragment, local);
          current = true;
        },
        o(local) {
          transition_out(search_1.$$.fragment, local);
          transition_out(if_block);
          transition_out(pagingtable.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          destroy_component(search_1, detaching);
          if (detaching)
            detach(t0);
          if (if_block)
            if_block.d(detaching);
          if (detaching)
            detach(t1);
          destroy_component(pagingtable, detaching);
        }
      };
    }
    function instance$7($$self, $$props, $$invalidate) {
      let { idHead = "id" } = $$props;
      let { head = [] } = $$props;
      let { body = [] } = $$props;
      let { sortable = false } = $$props;
      let { pageInfo = {} } = $$props;
      let { api: api2 } = $$props;
      let { refreshHandler = (opt) => {
      } } = $$props;
      let { clickHandler = () => {
      } } = $$props;
      let { createHandler = () => {
      } } = $$props;
      let { onSuccessUploadExcel = (int) => {
      } } = $$props;
      let { queryOptions = {} } = $$props;
      let { createLabel = "Create" } = $$props;
      let { creatable = false } = $$props;
      let { selectedIdx } = $$props;
      let { excelFile } = $$props;
      let { options = {} } = $$props;
      let originBody = [];
      onMount(() => {
        init2();
      });
      afterUpdate(() => {
        init2();
      });
      function init2() {
        if (originBody.length < body.length) {
          originBody = JSON.parse(JSON.stringify(body));
        }
      }
      function search(keyword) {
        $$invalidate(0, queryOptions.keyword = keyword, queryOptions);
        refreshHandler(queryOptions);
      }
      $$self.$$set = ($$props2) => {
        if ("idHead" in $$props2)
          $$invalidate(1, idHead = $$props2.idHead);
        if ("head" in $$props2)
          $$invalidate(2, head = $$props2.head);
        if ("body" in $$props2)
          $$invalidate(3, body = $$props2.body);
        if ("sortable" in $$props2)
          $$invalidate(4, sortable = $$props2.sortable);
        if ("pageInfo" in $$props2)
          $$invalidate(5, pageInfo = $$props2.pageInfo);
        if ("api" in $$props2)
          $$invalidate(14, api2 = $$props2.api);
        if ("refreshHandler" in $$props2)
          $$invalidate(6, refreshHandler = $$props2.refreshHandler);
        if ("clickHandler" in $$props2)
          $$invalidate(7, clickHandler = $$props2.clickHandler);
        if ("createHandler" in $$props2)
          $$invalidate(8, createHandler = $$props2.createHandler);
        if ("onSuccessUploadExcel" in $$props2)
          $$invalidate(15, onSuccessUploadExcel = $$props2.onSuccessUploadExcel);
        if ("queryOptions" in $$props2)
          $$invalidate(0, queryOptions = $$props2.queryOptions);
        if ("createLabel" in $$props2)
          $$invalidate(9, createLabel = $$props2.createLabel);
        if ("creatable" in $$props2)
          $$invalidate(10, creatable = $$props2.creatable);
        if ("selectedIdx" in $$props2)
          $$invalidate(11, selectedIdx = $$props2.selectedIdx);
        if ("excelFile" in $$props2)
          $$invalidate(16, excelFile = $$props2.excelFile);
        if ("options" in $$props2)
          $$invalidate(12, options = $$props2.options);
      };
      return [
        queryOptions,
        idHead,
        head,
        body,
        sortable,
        pageInfo,
        refreshHandler,
        clickHandler,
        createHandler,
        createLabel,
        creatable,
        selectedIdx,
        options,
        search,
        api2,
        onSuccessUploadExcel,
        excelFile
      ];
    }
    class PagingSearchableTable extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$7, create_fragment$8, safe_not_equal, {
          idHead: 1,
          head: 2,
          body: 3,
          sortable: 4,
          pageInfo: 5,
          api: 14,
          refreshHandler: 6,
          clickHandler: 7,
          createHandler: 8,
          onSuccessUploadExcel: 15,
          queryOptions: 0,
          createLabel: 9,
          creatable: 10,
          selectedIdx: 11,
          excelFile: 16,
          options: 12
        });
      }
    }
    function create_fragment$7(ctx) {
      let pagingsearchabletable;
      let current;
      pagingsearchabletable = new PagingSearchableTable({
        props: {
          head: (
            /*head*/
            ctx[3]
          ),
          body: (
            /*data*/
            ctx[2]
          ),
          clickHandler: (
            /*selected*/
            ctx[4]
          ),
          pageInfo: (
            /*pageInfo*/
            ctx[1]
          ),
          refreshHandler: (
            /*refreshHandler*/
            ctx[0]
          ),
          creatable: "false"
        }
      });
      return {
        c() {
          create_component(pagingsearchabletable.$$.fragment);
        },
        m(target, anchor) {
          mount_component(pagingsearchabletable, target, anchor);
          current = true;
        },
        p(ctx2, [dirty]) {
          const pagingsearchabletable_changes = {};
          if (dirty & /*data*/
          4)
            pagingsearchabletable_changes.body = /*data*/
            ctx2[2];
          if (dirty & /*pageInfo*/
          2)
            pagingsearchabletable_changes.pageInfo = /*pageInfo*/
            ctx2[1];
          if (dirty & /*refreshHandler*/
          1)
            pagingsearchabletable_changes.refreshHandler = /*refreshHandler*/
            ctx2[0];
          pagingsearchabletable.$set(pagingsearchabletable_changes);
        },
        i(local) {
          if (current)
            return;
          transition_in(pagingsearchabletable.$$.fragment, local);
          current = true;
        },
        o(local) {
          transition_out(pagingsearchabletable.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          destroy_component(pagingsearchabletable, detaching);
        }
      };
    }
    function instance$6($$self, $$props, $$invalidate) {
      let { selectedInstagram = () => {
      } } = $$props;
      let { addInstagram = () => {
      } } = $$props;
      let { queryOptions = {} } = $$props;
      let { refreshHandler = () => {
      } } = $$props;
      let { pageInfo = {} } = $$props;
      let { data = [] } = $$props;
      let head = [
        { key: "id", name: "ID" },
        { key: "userName", name: "인스타 아이디" },
        { key: "category", name: "카테고리" },
        { key: "fullName", name: "이름" },
        { key: "biography", name: "소개" },
        {
          key: "mediaCount",
          name: "게시물 수",
          type: "number"
        },
        {
          key: "followerCount",
          name: "팔로워",
          type: "number"
        }
      ];
      function selected(idx, item) {
        selectedInstagram(item);
        window.scrollTo(0, 0);
      }
      $$self.$$set = ($$props2) => {
        if ("selectedInstagram" in $$props2)
          $$invalidate(5, selectedInstagram = $$props2.selectedInstagram);
        if ("addInstagram" in $$props2)
          $$invalidate(6, addInstagram = $$props2.addInstagram);
        if ("queryOptions" in $$props2)
          $$invalidate(7, queryOptions = $$props2.queryOptions);
        if ("refreshHandler" in $$props2)
          $$invalidate(0, refreshHandler = $$props2.refreshHandler);
        if ("pageInfo" in $$props2)
          $$invalidate(1, pageInfo = $$props2.pageInfo);
        if ("data" in $$props2)
          $$invalidate(2, data = $$props2.data);
      };
      return [
        refreshHandler,
        pageInfo,
        data,
        head,
        selected,
        selectedInstagram,
        addInstagram,
        queryOptions
      ];
    }
    class InstagramList extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$6, create_fragment$7, safe_not_equal, {
          selectedInstagram: 5,
          addInstagram: 6,
          queryOptions: 7,
          refreshHandler: 0,
          pageInfo: 1,
          data: 2
        });
      }
    }
    const UuidImage_svelte_svelte_type_style_lang = "";
    function get_each_context$2(ctx, list, i2) {
      const child_ctx = ctx.slice();
      child_ctx[7] = list[i2];
      return child_ctx;
    }
    function create_each_block$2(ctx) {
      let div1;
      let div0;
      return {
        c() {
          div1 = element("div");
          div0 = element("div");
          attr(div0, "class", "circle svelte-1bx1tno");
          set_style(div1, "position", "absolute");
          set_style(
            div1,
            "top",
            /*getDotY*/
            ctx[6](
              /*dot*/
              ctx[7]
            ) + "px"
          );
          set_style(
            div1,
            "left",
            /*getDotX*/
            ctx[5](
              /*dot*/
              ctx[7]
            ) + "px"
          );
        },
        m(target, anchor) {
          insert(target, div1, anchor);
          append(div1, div0);
        },
        p(ctx2, dirty) {
          if (dirty & /*dots*/
          8) {
            set_style(
              div1,
              "top",
              /*getDotY*/
              ctx2[6](
                /*dot*/
                ctx2[7]
              ) + "px"
            );
          }
          if (dirty & /*dots*/
          8) {
            set_style(
              div1,
              "left",
              /*getDotX*/
              ctx2[5](
                /*dot*/
                ctx2[7]
              ) + "px"
            );
          }
        },
        d(detaching) {
          if (detaching)
            detach(div1);
        }
      };
    }
    function create_fragment$6(ctx) {
      let div;
      let t2;
      let img;
      let img_src_value;
      let each_value = (
        /*dots*/
        ctx[3]
      );
      let each_blocks = [];
      for (let i2 = 0; i2 < each_value.length; i2 += 1) {
        each_blocks[i2] = create_each_block$2(get_each_context$2(ctx, each_value, i2));
      }
      return {
        c() {
          div = element("div");
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            each_blocks[i2].c();
          }
          t2 = space();
          img = element("img");
          if (!src_url_equal(img.src, img_src_value = /*API_URL*/
          ctx[4] + "/api/file/" + /*uuid*/
          ctx[0]))
            attr(img, "src", img_src_value);
          attr(
            img,
            "width",
            /*width*/
            ctx[1]
          );
          attr(
            img,
            "height",
            /*height*/
            ctx[2]
          );
          set_style(div, "position", "relative");
        },
        m(target, anchor) {
          insert(target, div, anchor);
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            if (each_blocks[i2]) {
              each_blocks[i2].m(div, null);
            }
          }
          append(div, t2);
          append(div, img);
        },
        p(ctx2, [dirty]) {
          if (dirty & /*getDotY, dots, getDotX*/
          104) {
            each_value = /*dots*/
            ctx2[3];
            let i2;
            for (i2 = 0; i2 < each_value.length; i2 += 1) {
              const child_ctx = get_each_context$2(ctx2, each_value, i2);
              if (each_blocks[i2]) {
                each_blocks[i2].p(child_ctx, dirty);
              } else {
                each_blocks[i2] = create_each_block$2(child_ctx);
                each_blocks[i2].c();
                each_blocks[i2].m(div, t2);
              }
            }
            for (; i2 < each_blocks.length; i2 += 1) {
              each_blocks[i2].d(1);
            }
            each_blocks.length = each_value.length;
          }
          if (dirty & /*uuid*/
          1 && !src_url_equal(img.src, img_src_value = /*API_URL*/
          ctx2[4] + "/api/file/" + /*uuid*/
          ctx2[0])) {
            attr(img, "src", img_src_value);
          }
          if (dirty & /*width*/
          2) {
            attr(
              img,
              "width",
              /*width*/
              ctx2[1]
            );
          }
          if (dirty & /*height*/
          4) {
            attr(
              img,
              "height",
              /*height*/
              ctx2[2]
            );
          }
        },
        i: noop,
        o: noop,
        d(detaching) {
          if (detaching)
            detach(div);
          destroy_each(each_blocks, detaching);
        }
      };
    }
    function instance$5($$self, $$props, $$invalidate) {
      const API_URL2 = "http://influencer.diffday.org:8070";
      let { uuid } = $$props;
      let { width } = $$props;
      let { height } = $$props;
      let { dots = [] } = $$props;
      function getDotX(dot) {
        if (dot.x) {
          return dot.x * width;
        }
        return width / 2;
      }
      function getDotY(dot) {
        if (dot.y) {
          return dot.y * height;
        }
        return height / 2;
      }
      $$self.$$set = ($$props2) => {
        if ("uuid" in $$props2)
          $$invalidate(0, uuid = $$props2.uuid);
        if ("width" in $$props2)
          $$invalidate(1, width = $$props2.width);
        if ("height" in $$props2)
          $$invalidate(2, height = $$props2.height);
        if ("dots" in $$props2)
          $$invalidate(3, dots = $$props2.dots);
      };
      return [uuid, width, height, dots, API_URL2, getDotX, getDotY];
    }
    class UuidImage extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$5, create_fragment$6, safe_not_equal, { uuid: 0, width: 1, height: 2, dots: 3 });
      }
    }
    function get_each_context$1(ctx, list, i2) {
      const child_ctx = ctx.slice();
      child_ctx[13] = list[i2];
      child_ctx[14] = list;
      child_ctx[15] = i2;
      return child_ctx;
    }
    function create_if_block$1(ctx) {
      let t0;
      let div;
      let t1;
      let button0;
      let t2;
      let button1;
      let current;
      let each_value = (
        /*rows*/
        ctx[1]
      );
      let each_blocks = [];
      for (let i2 = 0; i2 < each_value.length; i2 += 1) {
        each_blocks[i2] = create_each_block$1(get_each_context$1(ctx, each_value, i2));
      }
      const out = (i2) => transition_out(each_blocks[i2], 1, 1, () => {
        each_blocks[i2] = null;
      });
      button0 = new Button({
        props: {
          text: "확인",
          width: "20",
          style: "float:right"
        }
      });
      button0.$on(
        "click",
        /*save*/
        ctx[6]
      );
      button1 = new Button({
        props: {
          text: "삭제",
          width: "20",
          style: "float:left"
        }
      });
      button1.$on(
        "click",
        /*deleteItem*/
        ctx[5]
      );
      return {
        c() {
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            each_blocks[i2].c();
          }
          t0 = space();
          div = element("div");
          t1 = space();
          create_component(button0.$$.fragment);
          t2 = space();
          create_component(button1.$$.fragment);
          set_style(div, "margin-top", "20px");
        },
        m(target, anchor) {
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            if (each_blocks[i2]) {
              each_blocks[i2].m(target, anchor);
            }
          }
          insert(target, t0, anchor);
          insert(target, div, anchor);
          insert(target, t1, anchor);
          mount_component(button0, target, anchor);
          insert(target, t2, anchor);
          mount_component(button1, target, anchor);
          current = true;
        },
        p(ctx2, dirty) {
          if (dirty & /*COMPONENTS, rows, data, updateValue, options*/
          23) {
            each_value = /*rows*/
            ctx2[1];
            let i2;
            for (i2 = 0; i2 < each_value.length; i2 += 1) {
              const child_ctx = get_each_context$1(ctx2, each_value, i2);
              if (each_blocks[i2]) {
                each_blocks[i2].p(child_ctx, dirty);
                transition_in(each_blocks[i2], 1);
              } else {
                each_blocks[i2] = create_each_block$1(child_ctx);
                each_blocks[i2].c();
                transition_in(each_blocks[i2], 1);
                each_blocks[i2].m(t0.parentNode, t0);
              }
            }
            group_outros();
            for (i2 = each_value.length; i2 < each_blocks.length; i2 += 1) {
              out(i2);
            }
            check_outros();
          }
        },
        i(local) {
          if (current)
            return;
          for (let i2 = 0; i2 < each_value.length; i2 += 1) {
            transition_in(each_blocks[i2]);
          }
          transition_in(button0.$$.fragment, local);
          transition_in(button1.$$.fragment, local);
          current = true;
        },
        o(local) {
          each_blocks = each_blocks.filter(Boolean);
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            transition_out(each_blocks[i2]);
          }
          transition_out(button0.$$.fragment, local);
          transition_out(button1.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          destroy_each(each_blocks, detaching);
          if (detaching)
            detach(t0);
          if (detaching)
            detach(div);
          if (detaching)
            detach(t1);
          destroy_component(button0, detaching);
          if (detaching)
            detach(t2);
          destroy_component(button1, detaching);
        }
      };
    }
    function create_if_block_8(ctx) {
      let switch_instance;
      let updating_value;
      let switch_instance_anchor;
      let current;
      function switch_instance_value_binding(value) {
        ctx[10](
          value,
          /*row*/
          ctx[13]
        );
      }
      var switch_value = COMPONENTS["dropdown"];
      function switch_props(ctx2) {
        let switch_instance_props = {
          key: (
            /*row*/
            ctx2[13]["key"]
          ),
          options: (
            /*row*/
            ctx2[13]["options"]
          ),
          defaultValue: (
            /*row*/
            ctx2[13]["defaultValue"]
          )
        };
        if (
          /*data*/
          ctx2[0][
            /*row*/
            ctx2[13]["key"]
          ] !== void 0
        ) {
          switch_instance_props.value = /*data*/
          ctx2[0][
            /*row*/
            ctx2[13]["key"]
          ];
        }
        return { props: switch_instance_props };
      }
      if (switch_value) {
        switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
        binding_callbacks.push(() => bind(switch_instance, "value", switch_instance_value_binding));
      }
      return {
        c() {
          if (switch_instance)
            create_component(switch_instance.$$.fragment);
          switch_instance_anchor = empty();
        },
        m(target, anchor) {
          if (switch_instance)
            mount_component(switch_instance, target, anchor);
          insert(target, switch_instance_anchor, anchor);
          current = true;
        },
        p(new_ctx, dirty) {
          ctx = new_ctx;
          const switch_instance_changes = {};
          if (dirty & /*rows*/
          2)
            switch_instance_changes.key = /*row*/
            ctx[13]["key"];
          if (dirty & /*rows*/
          2)
            switch_instance_changes.options = /*row*/
            ctx[13]["options"];
          if (dirty & /*rows*/
          2)
            switch_instance_changes.defaultValue = /*row*/
            ctx[13]["defaultValue"];
          if (!updating_value && dirty & /*data, rows*/
          3) {
            updating_value = true;
            switch_instance_changes.value = /*data*/
            ctx[0][
              /*row*/
              ctx[13]["key"]
            ];
            add_flush_callback(() => updating_value = false);
          }
          if (switch_value !== (switch_value = COMPONENTS["dropdown"])) {
            if (switch_instance) {
              group_outros();
              const old_component = switch_instance;
              transition_out(old_component.$$.fragment, 1, 0, () => {
                destroy_component(old_component, 1);
              });
              check_outros();
            }
            if (switch_value) {
              switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
              binding_callbacks.push(() => bind(switch_instance, "value", switch_instance_value_binding));
              create_component(switch_instance.$$.fragment);
              transition_in(switch_instance.$$.fragment, 1);
              mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
            } else {
              switch_instance = null;
            }
          } else if (switch_value) {
            switch_instance.$set(switch_instance_changes);
          }
        },
        i(local) {
          if (current)
            return;
          if (switch_instance)
            transition_in(switch_instance.$$.fragment, local);
          current = true;
        },
        o(local) {
          if (switch_instance)
            transition_out(switch_instance.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(switch_instance_anchor);
          if (switch_instance)
            destroy_component(switch_instance, detaching);
        }
      };
    }
    function create_if_block_7(ctx) {
      let switch_instance;
      let switch_instance_anchor;
      let current;
      var switch_value = COMPONENTS["checkbox"];
      function switch_props(ctx2) {
        return {
          props: {
            id: (
              /*row*/
              ctx2[13]["key"]
            ),
            key: (
              /*row*/
              ctx2[13]["key"]
            ),
            value: (
              /*data*/
              ctx2[0][
                /*row*/
                ctx2[13]["key"]
              ]
            ),
            changedValue: (
              /*updateValue*/
              ctx2[4]
            ),
            options: (
              /*row*/
              ctx2[13]["options"]
            )
          }
        };
      }
      if (switch_value) {
        switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
      }
      return {
        c() {
          if (switch_instance)
            create_component(switch_instance.$$.fragment);
          switch_instance_anchor = empty();
        },
        m(target, anchor) {
          if (switch_instance)
            mount_component(switch_instance, target, anchor);
          insert(target, switch_instance_anchor, anchor);
          current = true;
        },
        p(ctx2, dirty) {
          const switch_instance_changes = {};
          if (dirty & /*rows*/
          2)
            switch_instance_changes.id = /*row*/
            ctx2[13]["key"];
          if (dirty & /*rows*/
          2)
            switch_instance_changes.key = /*row*/
            ctx2[13]["key"];
          if (dirty & /*data, rows*/
          3)
            switch_instance_changes.value = /*data*/
            ctx2[0][
              /*row*/
              ctx2[13]["key"]
            ];
          if (dirty & /*updateValue*/
          16)
            switch_instance_changes.changedValue = /*updateValue*/
            ctx2[4];
          if (dirty & /*rows*/
          2)
            switch_instance_changes.options = /*row*/
            ctx2[13]["options"];
          if (switch_value !== (switch_value = COMPONENTS["checkbox"])) {
            if (switch_instance) {
              group_outros();
              const old_component = switch_instance;
              transition_out(old_component.$$.fragment, 1, 0, () => {
                destroy_component(old_component, 1);
              });
              check_outros();
            }
            if (switch_value) {
              switch_instance = construct_svelte_component(switch_value, switch_props(ctx2));
              create_component(switch_instance.$$.fragment);
              transition_in(switch_instance.$$.fragment, 1);
              mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
            } else {
              switch_instance = null;
            }
          } else if (switch_value) {
            switch_instance.$set(switch_instance_changes);
          }
        },
        i(local) {
          if (current)
            return;
          if (switch_instance)
            transition_in(switch_instance.$$.fragment, local);
          current = true;
        },
        o(local) {
          if (switch_instance)
            transition_out(switch_instance.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(switch_instance_anchor);
          if (switch_instance)
            destroy_component(switch_instance, detaching);
        }
      };
    }
    function create_if_block_6(ctx) {
      let switch_instance;
      let switch_instance_anchor;
      let current;
      var switch_value = COMPONENTS["colorbox"];
      function switch_props(ctx2) {
        return {
          props: {
            id: (
              /*row*/
              ctx2[13]["key"]
            ),
            hex: (
              /*data*/
              ctx2[0][
                /*row*/
                ctx2[13]["key"]
              ]
            ),
            onUpdate: (
              /*updateValue*/
              ctx2[4]
            )
          }
        };
      }
      if (switch_value) {
        switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
      }
      return {
        c() {
          if (switch_instance)
            create_component(switch_instance.$$.fragment);
          switch_instance_anchor = empty();
        },
        m(target, anchor) {
          if (switch_instance)
            mount_component(switch_instance, target, anchor);
          insert(target, switch_instance_anchor, anchor);
          current = true;
        },
        p(ctx2, dirty) {
          const switch_instance_changes = {};
          if (dirty & /*rows*/
          2)
            switch_instance_changes.id = /*row*/
            ctx2[13]["key"];
          if (dirty & /*data, rows*/
          3)
            switch_instance_changes.hex = /*data*/
            ctx2[0][
              /*row*/
              ctx2[13]["key"]
            ];
          if (dirty & /*updateValue*/
          16)
            switch_instance_changes.onUpdate = /*updateValue*/
            ctx2[4];
          if (switch_value !== (switch_value = COMPONENTS["colorbox"])) {
            if (switch_instance) {
              group_outros();
              const old_component = switch_instance;
              transition_out(old_component.$$.fragment, 1, 0, () => {
                destroy_component(old_component, 1);
              });
              check_outros();
            }
            if (switch_value) {
              switch_instance = construct_svelte_component(switch_value, switch_props(ctx2));
              create_component(switch_instance.$$.fragment);
              transition_in(switch_instance.$$.fragment, 1);
              mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
            } else {
              switch_instance = null;
            }
          } else if (switch_value) {
            switch_instance.$set(switch_instance_changes);
          }
        },
        i(local) {
          if (current)
            return;
          if (switch_instance)
            transition_in(switch_instance.$$.fragment, local);
          current = true;
        },
        o(local) {
          if (switch_instance)
            transition_out(switch_instance.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(switch_instance_anchor);
          if (switch_instance)
            destroy_component(switch_instance, detaching);
        }
      };
    }
    function create_if_block_5(ctx) {
      var _a, _b;
      let uuidimage;
      let t2;
      let switch_instance;
      let switch_instance_anchor;
      let current;
      uuidimage = new UuidImage({
        props: {
          uuid: (
            /*data*/
            ctx[0][
              /*row*/
              ctx[13]["key"]
            ]
          ),
          width: (
            /*row*/
            (_a = ctx[13]["width"]) != null ? _a : "300"
          ),
          height: (
            /*row*/
            (_b = ctx[13]["height"]) != null ? _b : "300"
          ),
          dots: (
            /*options*/
            ctx[2] != null ? (
              /*options*/
              ctx[2][
                /*row*/
                ctx[13]["key"]
              ]
            ) : []
          )
        }
      });
      var switch_value = COMPONENTS["fileInput"];
      function switch_props(ctx2) {
        return {
          props: {
            id: (
              /*row*/
              ctx2[13]["key"]
            ),
            value: (
              /*data*/
              ctx2[0][
                /*row*/
                ctx2[13]["key"]
              ]
            ),
            onUpdate: (
              /*updateValue*/
              ctx2[4]
            )
          }
        };
      }
      if (switch_value) {
        switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
      }
      return {
        c() {
          create_component(uuidimage.$$.fragment);
          t2 = space();
          if (switch_instance)
            create_component(switch_instance.$$.fragment);
          switch_instance_anchor = empty();
        },
        m(target, anchor) {
          mount_component(uuidimage, target, anchor);
          insert(target, t2, anchor);
          if (switch_instance)
            mount_component(switch_instance, target, anchor);
          insert(target, switch_instance_anchor, anchor);
          current = true;
        },
        p(ctx2, dirty) {
          var _a2, _b2;
          const uuidimage_changes = {};
          if (dirty & /*data, rows*/
          3)
            uuidimage_changes.uuid = /*data*/
            ctx2[0][
              /*row*/
              ctx2[13]["key"]
            ];
          if (dirty & /*rows*/
          2)
            uuidimage_changes.width = /*row*/
            (_a2 = ctx2[13]["width"]) != null ? _a2 : "300";
          if (dirty & /*rows*/
          2)
            uuidimage_changes.height = /*row*/
            (_b2 = ctx2[13]["height"]) != null ? _b2 : "300";
          if (dirty & /*options, rows*/
          6)
            uuidimage_changes.dots = /*options*/
            ctx2[2] != null ? (
              /*options*/
              ctx2[2][
                /*row*/
                ctx2[13]["key"]
              ]
            ) : [];
          uuidimage.$set(uuidimage_changes);
          const switch_instance_changes = {};
          if (dirty & /*rows*/
          2)
            switch_instance_changes.id = /*row*/
            ctx2[13]["key"];
          if (dirty & /*data, rows*/
          3)
            switch_instance_changes.value = /*data*/
            ctx2[0][
              /*row*/
              ctx2[13]["key"]
            ];
          if (dirty & /*updateValue*/
          16)
            switch_instance_changes.onUpdate = /*updateValue*/
            ctx2[4];
          if (switch_value !== (switch_value = COMPONENTS["fileInput"])) {
            if (switch_instance) {
              group_outros();
              const old_component = switch_instance;
              transition_out(old_component.$$.fragment, 1, 0, () => {
                destroy_component(old_component, 1);
              });
              check_outros();
            }
            if (switch_value) {
              switch_instance = construct_svelte_component(switch_value, switch_props(ctx2));
              create_component(switch_instance.$$.fragment);
              transition_in(switch_instance.$$.fragment, 1);
              mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
            } else {
              switch_instance = null;
            }
          } else if (switch_value) {
            switch_instance.$set(switch_instance_changes);
          }
        },
        i(local) {
          if (current)
            return;
          transition_in(uuidimage.$$.fragment, local);
          if (switch_instance)
            transition_in(switch_instance.$$.fragment, local);
          current = true;
        },
        o(local) {
          transition_out(uuidimage.$$.fragment, local);
          if (switch_instance)
            transition_out(switch_instance.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          destroy_component(uuidimage, detaching);
          if (detaching)
            detach(t2);
          if (detaching)
            detach(switch_instance_anchor);
          if (switch_instance)
            destroy_component(switch_instance, detaching);
        }
      };
    }
    function create_if_block_4(ctx) {
      let img;
      let img_src_value;
      return {
        c() {
          img = element("img");
          if (!src_url_equal(img.src, img_src_value = /*data*/
          ctx[0][
            /*row*/
            ctx[13]["key"]
          ]))
            attr(img, "src", img_src_value);
          attr(img, "width", "200");
          attr(img, "height", "200");
          attr(img, "alt", "");
        },
        m(target, anchor) {
          insert(target, img, anchor);
        },
        p(ctx2, dirty) {
          if (dirty & /*data, rows*/
          3 && !src_url_equal(img.src, img_src_value = /*data*/
          ctx2[0][
            /*row*/
            ctx2[13]["key"]
          ])) {
            attr(img, "src", img_src_value);
          }
        },
        i: noop,
        o: noop,
        d(detaching) {
          if (detaching)
            detach(img);
        }
      };
    }
    function create_if_block_3(ctx) {
      let img;
      let img_src_value;
      return {
        c() {
          img = element("img");
          if (!src_url_equal(img.src, img_src_value = /*data*/
          ctx[0][
            /*row*/
            ctx[13]["key"]
          ]))
            attr(img, "src", img_src_value);
          attr(img, "width", "300");
          attr(img, "height", "300");
          attr(img, "alt", "");
        },
        m(target, anchor) {
          insert(target, img, anchor);
        },
        p(ctx2, dirty) {
          if (dirty & /*data, rows*/
          3 && !src_url_equal(img.src, img_src_value = /*data*/
          ctx2[0][
            /*row*/
            ctx2[13]["key"]
          ])) {
            attr(img, "src", img_src_value);
          }
        },
        i: noop,
        o: noop,
        d(detaching) {
          if (detaching)
            detach(img);
        }
      };
    }
    function create_if_block_2(ctx) {
      let switch_instance;
      let switch_instance_anchor;
      let current;
      var switch_value = COMPONENTS["input"];
      function switch_props(ctx2) {
        return {
          props: {
            id: (
              /*row*/
              ctx2[13]["key"]
            ),
            value: (
              /*data*/
              ctx2[0][
                /*row*/
                ctx2[13]["key"]
              ] || ""
            ),
            onUpdate: (
              /*updateValue*/
              ctx2[4]
            )
          }
        };
      }
      if (switch_value) {
        switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
      }
      return {
        c() {
          if (switch_instance)
            create_component(switch_instance.$$.fragment);
          switch_instance_anchor = empty();
        },
        m(target, anchor) {
          if (switch_instance)
            mount_component(switch_instance, target, anchor);
          insert(target, switch_instance_anchor, anchor);
          current = true;
        },
        p(ctx2, dirty) {
          const switch_instance_changes = {};
          if (dirty & /*rows*/
          2)
            switch_instance_changes.id = /*row*/
            ctx2[13]["key"];
          if (dirty & /*data, rows*/
          3)
            switch_instance_changes.value = /*data*/
            ctx2[0][
              /*row*/
              ctx2[13]["key"]
            ] || "";
          if (dirty & /*updateValue*/
          16)
            switch_instance_changes.onUpdate = /*updateValue*/
            ctx2[4];
          if (switch_value !== (switch_value = COMPONENTS["input"])) {
            if (switch_instance) {
              group_outros();
              const old_component = switch_instance;
              transition_out(old_component.$$.fragment, 1, 0, () => {
                destroy_component(old_component, 1);
              });
              check_outros();
            }
            if (switch_value) {
              switch_instance = construct_svelte_component(switch_value, switch_props(ctx2));
              create_component(switch_instance.$$.fragment);
              transition_in(switch_instance.$$.fragment, 1);
              mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
            } else {
              switch_instance = null;
            }
          } else if (switch_value) {
            switch_instance.$set(switch_instance_changes);
          }
        },
        i(local) {
          if (current)
            return;
          if (switch_instance)
            transition_in(switch_instance.$$.fragment, local);
          current = true;
        },
        o(local) {
          if (switch_instance)
            transition_out(switch_instance.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(switch_instance_anchor);
          if (switch_instance)
            destroy_component(switch_instance, detaching);
        }
      };
    }
    function create_if_block_1(ctx) {
      let switch_instance;
      let switch_instance_anchor;
      let current;
      var switch_value = COMPONENTS["input"];
      function switch_props(ctx2) {
        return {
          props: {
            id: (
              /*row*/
              ctx2[13]["key"]
            ),
            value: (
              /*data*/
              ctx2[0][
                /*row*/
                ctx2[13]["key"]
              ]
            ),
            disabled: true
          }
        };
      }
      if (switch_value) {
        switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
      }
      return {
        c() {
          if (switch_instance)
            create_component(switch_instance.$$.fragment);
          switch_instance_anchor = empty();
        },
        m(target, anchor) {
          if (switch_instance)
            mount_component(switch_instance, target, anchor);
          insert(target, switch_instance_anchor, anchor);
          current = true;
        },
        p(ctx2, dirty) {
          const switch_instance_changes = {};
          if (dirty & /*rows*/
          2)
            switch_instance_changes.id = /*row*/
            ctx2[13]["key"];
          if (dirty & /*data, rows*/
          3)
            switch_instance_changes.value = /*data*/
            ctx2[0][
              /*row*/
              ctx2[13]["key"]
            ];
          if (switch_value !== (switch_value = COMPONENTS["input"])) {
            if (switch_instance) {
              group_outros();
              const old_component = switch_instance;
              transition_out(old_component.$$.fragment, 1, 0, () => {
                destroy_component(old_component, 1);
              });
              check_outros();
            }
            if (switch_value) {
              switch_instance = construct_svelte_component(switch_value, switch_props(ctx2));
              create_component(switch_instance.$$.fragment);
              transition_in(switch_instance.$$.fragment, 1);
              mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
            } else {
              switch_instance = null;
            }
          } else if (switch_value) {
            switch_instance.$set(switch_instance_changes);
          }
        },
        i(local) {
          if (current)
            return;
          if (switch_instance)
            transition_in(switch_instance.$$.fragment, local);
          current = true;
        },
        o(local) {
          if (switch_instance)
            transition_out(switch_instance.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(switch_instance_anchor);
          if (switch_instance)
            destroy_component(switch_instance, detaching);
        }
      };
    }
    function create_each_block$1(ctx) {
      let div1;
      let label;
      let t2;
      let div0;
      let current_block_type_index;
      let if_block;
      let current;
      label = new Label({
        props: {
          id: "name",
          options: {
            label: (
              /*row*/
              ctx[13]["label"]
            ),
            classes: "col-sm-2 col-form-label text-break"
          }
        }
      });
      const if_block_creators = [
        create_if_block_1,
        create_if_block_2,
        create_if_block_3,
        create_if_block_4,
        create_if_block_5,
        create_if_block_6,
        create_if_block_7,
        create_if_block_8
      ];
      const if_blocks = [];
      function select_block_type(ctx2, dirty) {
        if (
          /*row*/
          ctx2[13]["type"] === "text" || /*row*/
          ctx2[13]["type"] == "not-updatable-text" && /*data*/
          ctx2[0].id
        )
          return 0;
        if (
          /*row*/
          ctx2[13]["type"] === "edit-text" || /*row*/
          ctx2[13]["type"] == "not-updatable-text" && !/*data*/
          ctx2[0].id
        )
          return 1;
        if (
          /*row*/
          ctx2[13]["type"] === "url-image"
        )
          return 2;
        if (
          /*row*/
          ctx2[13]["type"] === "thumbnail"
        )
          return 3;
        if (
          /*row*/
          ctx2[13]["type"] === "image"
        )
          return 4;
        if (
          /*row*/
          ctx2[13]["type"] === "colorbox"
        )
          return 5;
        if (
          /*row*/
          ctx2[13]["type"] === "checkbox"
        )
          return 6;
        if (
          /*row*/
          ctx2[13]["type"] === "select"
        )
          return 7;
        return -1;
      }
      if (~(current_block_type_index = select_block_type(ctx))) {
        if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
      }
      return {
        c() {
          div1 = element("div");
          create_component(label.$$.fragment);
          t2 = space();
          div0 = element("div");
          if (if_block)
            if_block.c();
          attr(div0, "class", "col-sm-10");
          attr(div1, "class", "row");
          set_style(div1, "margin-top", "20px");
        },
        m(target, anchor) {
          insert(target, div1, anchor);
          mount_component(label, div1, null);
          append(div1, t2);
          append(div1, div0);
          if (~current_block_type_index) {
            if_blocks[current_block_type_index].m(div0, null);
          }
          current = true;
        },
        p(ctx2, dirty) {
          const label_changes = {};
          if (dirty & /*rows*/
          2)
            label_changes.options = {
              label: (
                /*row*/
                ctx2[13]["label"]
              ),
              classes: "col-sm-2 col-form-label text-break"
            };
          label.$set(label_changes);
          let previous_block_index = current_block_type_index;
          current_block_type_index = select_block_type(ctx2);
          if (current_block_type_index === previous_block_index) {
            if (~current_block_type_index) {
              if_blocks[current_block_type_index].p(ctx2, dirty);
            }
          } else {
            if (if_block) {
              group_outros();
              transition_out(if_blocks[previous_block_index], 1, 1, () => {
                if_blocks[previous_block_index] = null;
              });
              check_outros();
            }
            if (~current_block_type_index) {
              if_block = if_blocks[current_block_type_index];
              if (!if_block) {
                if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
                if_block.c();
              } else {
                if_block.p(ctx2, dirty);
              }
              transition_in(if_block, 1);
              if_block.m(div0, null);
            } else {
              if_block = null;
            }
          }
        },
        i(local) {
          if (current)
            return;
          transition_in(label.$$.fragment, local);
          transition_in(if_block);
          current = true;
        },
        o(local) {
          transition_out(label.$$.fragment, local);
          transition_out(if_block);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(div1);
          destroy_component(label);
          if (~current_block_type_index) {
            if_blocks[current_block_type_index].d();
          }
        }
      };
    }
    function create_fragment$5(ctx) {
      let div;
      let t2;
      let if_block_anchor;
      let current;
      let if_block = (
        /*rows*/
        ctx[1] && /*data*/
        ctx[0] && create_if_block$1(ctx)
      );
      return {
        c() {
          div = element("div");
          t2 = space();
          if (if_block)
            if_block.c();
          if_block_anchor = empty();
          set_style(
            div,
            "margin-top",
            /*marginTop*/
            ctx[3] + "px"
          );
        },
        m(target, anchor) {
          insert(target, div, anchor);
          insert(target, t2, anchor);
          if (if_block)
            if_block.m(target, anchor);
          insert(target, if_block_anchor, anchor);
          current = true;
        },
        p(ctx2, [dirty]) {
          if (!current || dirty & /*marginTop*/
          8) {
            set_style(
              div,
              "margin-top",
              /*marginTop*/
              ctx2[3] + "px"
            );
          }
          if (
            /*rows*/
            ctx2[1] && /*data*/
            ctx2[0]
          ) {
            if (if_block) {
              if_block.p(ctx2, dirty);
              if (dirty & /*rows, data*/
              3) {
                transition_in(if_block, 1);
              }
            } else {
              if_block = create_if_block$1(ctx2);
              if_block.c();
              transition_in(if_block, 1);
              if_block.m(if_block_anchor.parentNode, if_block_anchor);
            }
          } else if (if_block) {
            group_outros();
            transition_out(if_block, 1, 1, () => {
              if_block = null;
            });
            check_outros();
          }
        },
        i(local) {
          if (current)
            return;
          transition_in(if_block);
          current = true;
        },
        o(local) {
          transition_out(if_block);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(div);
          if (detaching)
            detach(t2);
          if (if_block)
            if_block.d(detaching);
          if (detaching)
            detach(if_block_anchor);
        }
      };
    }
    function instance$4($$self, $$props, $$invalidate) {
      let { rows } = $$props;
      let { data } = $$props;
      let { options } = $$props;
      let { marginTop = 130 } = $$props;
      let { beforeSave = () => {
      } } = $$props;
      let { onChange = (key, value) => {
      } } = $$props;
      let { api: api2 } = $$props;
      let { updateValue = (key, value) => {
        onChange(key, value);
      } } = $$props;
      function deleteItem() {
        return __async(this, null, function* () {
          var isDelete = confirm("정말 삭제 하시겠습니까?");
          if (isDelete) {
            const res = yield api2.deleteById(data.id);
            if (res.status === 200) {
              toast.push({ content: "삭제 되었습니다" });
              window.location.reload();
            } else {
              toast.push({ content: res.message });
            }
          }
        });
      }
      function save() {
        return __async(this, null, function* () {
          beforeSave();
          const res = yield api2.save(data);
          if (res.status === 200) {
            toast.push({ content: "저장 되었습니다" });
          } else {
            toast.push({ content: "서버 오류로 저장 하지 못했습니다" });
          }
        });
      }
      function switch_instance_value_binding(value, row) {
        if ($$self.$$.not_equal(data[row["key"]], value)) {
          data[row["key"]] = value;
          $$invalidate(0, data);
        }
      }
      $$self.$$set = ($$props2) => {
        if ("rows" in $$props2)
          $$invalidate(1, rows = $$props2.rows);
        if ("data" in $$props2)
          $$invalidate(0, data = $$props2.data);
        if ("options" in $$props2)
          $$invalidate(2, options = $$props2.options);
        if ("marginTop" in $$props2)
          $$invalidate(3, marginTop = $$props2.marginTop);
        if ("beforeSave" in $$props2)
          $$invalidate(7, beforeSave = $$props2.beforeSave);
        if ("onChange" in $$props2)
          $$invalidate(8, onChange = $$props2.onChange);
        if ("api" in $$props2)
          $$invalidate(9, api2 = $$props2.api);
        if ("updateValue" in $$props2)
          $$invalidate(4, updateValue = $$props2.updateValue);
      };
      return [
        data,
        rows,
        options,
        marginTop,
        updateValue,
        deleteItem,
        save,
        beforeSave,
        onChange,
        api2,
        switch_instance_value_binding
      ];
    }
    class DetailView extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$4, create_fragment$5, safe_not_equal, {
          rows: 1,
          data: 0,
          options: 2,
          marginTop: 3,
          beforeSave: 7,
          onChange: 8,
          api: 9,
          updateValue: 4
        });
      }
    }
    function create_else_block(ctx) {
      let detailview;
      let current;
      detailview = new DetailView({
        props: {
          marginTop: "0",
          rows: (
            /*newRows*/
            ctx[2]
          ),
          data: (
            /*instagram*/
            ctx[0]
          ),
          api: instagramApi,
          onChange: (
            /*updateValue*/
            ctx[4]
          ),
          options: (
            /*options*/
            ctx[1]
          )
        }
      });
      return {
        c() {
          create_component(detailview.$$.fragment);
        },
        m(target, anchor) {
          mount_component(detailview, target, anchor);
          current = true;
        },
        p(ctx2, dirty) {
          const detailview_changes = {};
          if (dirty & /*instagram*/
          1)
            detailview_changes.data = /*instagram*/
            ctx2[0];
          detailview.$set(detailview_changes);
        },
        i(local) {
          if (current)
            return;
          transition_in(detailview.$$.fragment, local);
          current = true;
        },
        o(local) {
          transition_out(detailview.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          destroy_component(detailview, detaching);
        }
      };
    }
    function create_if_block(ctx) {
      let detailview;
      let current;
      detailview = new DetailView({
        props: {
          marginTop: "0",
          rows: (
            /*rows*/
            ctx[3]
          ),
          data: (
            /*instagram*/
            ctx[0]
          ),
          api: instagramApi,
          onChange: (
            /*updateValue*/
            ctx[4]
          ),
          options: (
            /*options*/
            ctx[1]
          )
        }
      });
      return {
        c() {
          create_component(detailview.$$.fragment);
        },
        m(target, anchor) {
          mount_component(detailview, target, anchor);
          current = true;
        },
        p(ctx2, dirty) {
          const detailview_changes = {};
          if (dirty & /*instagram*/
          1)
            detailview_changes.data = /*instagram*/
            ctx2[0];
          detailview.$set(detailview_changes);
        },
        i(local) {
          if (current)
            return;
          transition_in(detailview.$$.fragment, local);
          current = true;
        },
        o(local) {
          transition_out(detailview.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          destroy_component(detailview, detaching);
        }
      };
    }
    function create_fragment$4(ctx) {
      let current_block_type_index;
      let if_block;
      let if_block_anchor;
      let current;
      const if_block_creators = [create_if_block, create_else_block];
      const if_blocks = [];
      function select_block_type(ctx2, dirty) {
        if (
          /*instagram*/
          ctx2[0].id
        )
          return 0;
        return 1;
      }
      current_block_type_index = select_block_type(ctx);
      if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
      return {
        c() {
          if_block.c();
          if_block_anchor = empty();
        },
        m(target, anchor) {
          if_blocks[current_block_type_index].m(target, anchor);
          insert(target, if_block_anchor, anchor);
          current = true;
        },
        p(ctx2, [dirty]) {
          let previous_block_index = current_block_type_index;
          current_block_type_index = select_block_type(ctx2);
          if (current_block_type_index === previous_block_index) {
            if_blocks[current_block_type_index].p(ctx2, dirty);
          } else {
            group_outros();
            transition_out(if_blocks[previous_block_index], 1, 1, () => {
              if_blocks[previous_block_index] = null;
            });
            check_outros();
            if_block = if_blocks[current_block_type_index];
            if (!if_block) {
              if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
              if_block.c();
            } else {
              if_block.p(ctx2, dirty);
            }
            transition_in(if_block, 1);
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        },
        i(local) {
          if (current)
            return;
          transition_in(if_block);
          current = true;
        },
        o(local) {
          transition_out(if_block);
          current = false;
        },
        d(detaching) {
          if_blocks[current_block_type_index].d(detaching);
          if (detaching)
            detach(if_block_anchor);
        }
      };
    }
    function instance$3($$self, $$props, $$invalidate) {
      let { instagram } = $$props;
      let { onUpdatedInstagram } = $$props;
      let options = {};
      let newRows = [
        {
          key: "type",
          label: "플랫폼",
          type: "select",
          options: ["YOUTUBE"],
          defaultValue: "YOUTUBE"
        },
        {
          key: "referenceId",
          label: "컨텐츠 키",
          type: "edit-text"
        }
      ];
      let rows = [
        { key: "id", label: "ID", type: "text" },
        {
          key: "channelId",
          label: "채널 ID",
          type: "text"
        },
        {
          key: "channelTitle",
          label: "채널명",
          type: "text"
        },
        {
          key: "titleEng",
          label: "타이틀-영문",
          type: "edit-text"
        },
        {
          key: "titleKor",
          label: "타이틀-한글",
          type: "edit-text"
        },
        {
          key: "titleJp",
          label: "타이틀-일어",
          type: "edit-text"
        },
        {
          key: "type",
          label: "플랫폼",
          type: "select",
          options: ["YOUTUBE"],
          defaultValue: "YOUTUBE"
        },
        {
          key: "referenceId",
          label: "컨텐츠 키",
          type: "edit-text"
        },
        {
          key: "thumbnailUrl",
          label: "썸네일",
          type: "url-image"
        },
        {
          key: "contentEng",
          label: "설명-영문",
          type: "edit-text"
        },
        {
          key: "contentKor",
          label: "설명-한글",
          type: "edit-text"
        },
        {
          key: "contentJp",
          label: "설명-일어",
          type: "edit-text"
        },
        {
          key: "createdAt",
          label: "최초 생성",
          type: "text"
        },
        {
          key: "updatedAt",
          label: "최종 수정",
          type: "text"
        }
      ];
      function updateValue(key, value) {
        $$invalidate(0, instagram[key] = value, instagram);
        onUpdatedInstagram(instagram);
      }
      $$self.$$set = ($$props2) => {
        if ("instagram" in $$props2)
          $$invalidate(0, instagram = $$props2.instagram);
        if ("onUpdatedInstagram" in $$props2)
          $$invalidate(5, onUpdatedInstagram = $$props2.onUpdatedInstagram);
      };
      return [instagram, options, newRows, rows, updateValue, onUpdatedInstagram];
    }
    class InstagramDetail extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$3, create_fragment$4, safe_not_equal, { instagram: 0, onUpdatedInstagram: 5 });
      }
    }
    function create_fragment$3(ctx) {
      let div2;
      let div0;
      let instagramlist;
      let t2;
      let div1;
      let instagramdetail;
      let current;
      instagramlist = new InstagramList({
        props: {
          data: (
            /*data*/
            ctx[2]
          ),
          pageInfo: (
            /*res*/
            ctx[1]
          ),
          selectedInstagram: (
            /*selectInstagram*/
            ctx[5]
          ),
          addInstagram: (
            /*addInstagram*/
            ctx[7]
          ),
          queryOptions: (
            /*options*/
            ctx[3]
          ),
          refreshHandler: (
            /*refresh*/
            ctx[4]
          )
        }
      });
      instagramdetail = new InstagramDetail({
        props: {
          instagram: (
            /*instagram*/
            ctx[0]
          ),
          onUpdatedInstagram: (
            /*updateInstagram*/
            ctx[6]
          )
        }
      });
      return {
        c() {
          div2 = element("div");
          div0 = element("div");
          create_component(instagramlist.$$.fragment);
          t2 = space();
          div1 = element("div");
          create_component(instagramdetail.$$.fragment);
          attr(div0, "class", "col-sm-6 left");
          attr(div1, "class", "col-sm-6 right");
        },
        m(target, anchor) {
          insert(target, div2, anchor);
          append(div2, div0);
          mount_component(instagramlist, div0, null);
          append(div2, t2);
          append(div2, div1);
          mount_component(instagramdetail, div1, null);
          current = true;
        },
        p(ctx2, [dirty]) {
          const instagramlist_changes = {};
          if (dirty & /*data*/
          4)
            instagramlist_changes.data = /*data*/
            ctx2[2];
          if (dirty & /*res*/
          2)
            instagramlist_changes.pageInfo = /*res*/
            ctx2[1];
          if (dirty & /*options*/
          8)
            instagramlist_changes.queryOptions = /*options*/
            ctx2[3];
          instagramlist.$set(instagramlist_changes);
          const instagramdetail_changes = {};
          if (dirty & /*instagram*/
          1)
            instagramdetail_changes.instagram = /*instagram*/
            ctx2[0];
          instagramdetail.$set(instagramdetail_changes);
        },
        i(local) {
          if (current)
            return;
          transition_in(instagramlist.$$.fragment, local);
          transition_in(instagramdetail.$$.fragment, local);
          current = true;
        },
        o(local) {
          transition_out(instagramlist.$$.fragment, local);
          transition_out(instagramdetail.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(div2);
          destroy_component(instagramlist);
          destroy_component(instagramdetail);
        }
      };
    }
    function instance$2($$self, $$props, $$invalidate) {
      let instagram = {};
      let res = {};
      let data = [];
      let options = { "page": "0", "size": "10" };
      onMount(() => __async(this, null, function* () {
        yield refresh();
      }));
      function refresh(qr) {
        return __async(this, null, function* () {
          for (let k2 in qr) {
            $$invalidate(3, options[k2] = qr[k2], options);
          }
          $$invalidate(1, res = yield instagramApi.getAllByOptions(options));
          $$invalidate(2, data = res.contents);
        });
      }
      function selectInstagram(data2) {
        $$invalidate(0, instagram = data2);
      }
      function updateInstagram(m2) {
        var idx = data.findIndex((d2) => d2.id === m2.id);
        $$invalidate(2, data[idx] = m2, data);
      }
      function addInstagram() {
        $$invalidate(0, instagram = { type: "INFLUENCER", nameEng: "" });
      }
      return [
        instagram,
        res,
        data,
        options,
        refresh,
        selectInstagram,
        updateInstagram,
        addInstagram
      ];
    }
    class Instagram extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$2, create_fragment$3, safe_not_equal, {});
      }
    }
    const routes = {
      // Exact path
      "/": wrap({
        component: Instagram
      }),
      "/instagram": wrap({ component: Instagram })
    };
    function get_each_context(ctx, list, i2) {
      const child_ctx = ctx.slice();
      child_ctx[1] = list[i2].type;
      child_ctx[2] = list[i2].content;
      child_ctx[4] = i2;
      return child_ctx;
    }
    function create_each_block(ctx) {
      let toast2;
      let current;
      toast2 = new Toast({
        props: {
          index: (
            /*index*/
            ctx[4]
          ),
          type: (
            /*type*/
            ctx[1]
          ),
          content: (
            /*content*/
            ctx[2]
          )
        }
      });
      return {
        c() {
          create_component(toast2.$$.fragment);
        },
        m(target, anchor) {
          mount_component(toast2, target, anchor);
          current = true;
        },
        p(ctx2, dirty) {
          const toast_changes = {};
          if (dirty & /*$toasts*/
          1)
            toast_changes.type = /*type*/
            ctx2[1];
          if (dirty & /*$toasts*/
          1)
            toast_changes.content = /*content*/
            ctx2[2];
          toast2.$set(toast_changes);
        },
        i(local) {
          if (current)
            return;
          transition_in(toast2.$$.fragment, local);
          current = true;
        },
        o(local) {
          transition_out(toast2.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          destroy_component(toast2, detaching);
        }
      };
    }
    function create_fragment$2(ctx) {
      let div;
      let current;
      let each_value = (
        /*$toasts*/
        ctx[0]
      );
      let each_blocks = [];
      for (let i2 = 0; i2 < each_value.length; i2 += 1) {
        each_blocks[i2] = create_each_block(get_each_context(ctx, each_value, i2));
      }
      const out = (i2) => transition_out(each_blocks[i2], 1, 1, () => {
        each_blocks[i2] = null;
      });
      return {
        c() {
          div = element("div");
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            each_blocks[i2].c();
          }
          attr(div, "class", "toast-container position-fixed top-0 end-0 p-3");
          set_style(div, "z-index", "11");
        },
        m(target, anchor) {
          insert(target, div, anchor);
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            if (each_blocks[i2]) {
              each_blocks[i2].m(div, null);
            }
          }
          current = true;
        },
        p(ctx2, [dirty]) {
          if (dirty & /*$toasts*/
          1) {
            each_value = /*$toasts*/
            ctx2[0];
            let i2;
            for (i2 = 0; i2 < each_value.length; i2 += 1) {
              const child_ctx = get_each_context(ctx2, each_value, i2);
              if (each_blocks[i2]) {
                each_blocks[i2].p(child_ctx, dirty);
                transition_in(each_blocks[i2], 1);
              } else {
                each_blocks[i2] = create_each_block(child_ctx);
                each_blocks[i2].c();
                transition_in(each_blocks[i2], 1);
                each_blocks[i2].m(div, null);
              }
            }
            group_outros();
            for (i2 = each_value.length; i2 < each_blocks.length; i2 += 1) {
              out(i2);
            }
            check_outros();
          }
        },
        i(local) {
          if (current)
            return;
          for (let i2 = 0; i2 < each_value.length; i2 += 1) {
            transition_in(each_blocks[i2]);
          }
          current = true;
        },
        o(local) {
          each_blocks = each_blocks.filter(Boolean);
          for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
            transition_out(each_blocks[i2]);
          }
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(div);
          destroy_each(each_blocks, detaching);
        }
      };
    }
    function instance$1($$self, $$props, $$invalidate) {
      let $toasts;
      component_subscribe($$self, toasts, ($$value) => $$invalidate(0, $toasts = $$value));
      return [$toasts];
    }
    class Toasts extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance$1, create_fragment$2, safe_not_equal, {});
      }
    }
    function create_fragment$1(ctx) {
      let div1;
      let div0;
      let router;
      let t2;
      let toasts2;
      let current;
      router = new Router({ props: { routes } });
      toasts2 = new Toasts({});
      return {
        c() {
          div1 = element("div");
          div0 = element("div");
          create_component(router.$$.fragment);
          t2 = space();
          create_component(toasts2.$$.fragment);
          attr(div0, "class", "content-container");
          attr(div0, "id", "content-container");
        },
        m(target, anchor) {
          insert(target, div1, anchor);
          append(div1, div0);
          mount_component(router, div0, null);
          append(div0, t2);
          mount_component(toasts2, div0, null);
          current = true;
        },
        p: noop,
        i(local) {
          if (current)
            return;
          transition_in(router.$$.fragment, local);
          transition_in(toasts2.$$.fragment, local);
          current = true;
        },
        o(local) {
          transition_out(router.$$.fragment, local);
          transition_out(toasts2.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(div1);
          destroy_component(router);
          destroy_component(toasts2);
        }
      };
    }
    class Contents extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, null, create_fragment$1, safe_not_equal, {});
      }
    }
    function create_fragment(ctx) {
      let div;
      let sidebar;
      let t2;
      let contents;
      let current;
      sidebar = new Sidebar({});
      contents = new Contents({});
      return {
        c() {
          div = element("div");
          create_component(sidebar.$$.fragment);
          t2 = space();
          create_component(contents.$$.fragment);
          attr(div, "id", "app-main");
        },
        m(target, anchor) {
          insert(target, div, anchor);
          mount_component(sidebar, div, null);
          append(div, t2);
          mount_component(contents, div, null);
          current = true;
        },
        p: noop,
        i(local) {
          if (current)
            return;
          transition_in(sidebar.$$.fragment, local);
          transition_in(contents.$$.fragment, local);
          current = true;
        },
        o(local) {
          transition_out(sidebar.$$.fragment, local);
          transition_out(contents.$$.fragment, local);
          current = false;
        },
        d(detaching) {
          if (detaching)
            detach(div);
          destroy_component(sidebar);
          destroy_component(contents);
        }
      };
    }
    let color = "blue";
    function instance($$self) {
      const element2 = document.getElementById("app");
      element2.classList.add(color);
      return [];
    }
    class App extends SvelteComponent {
      constructor(options) {
        super();
        init$1(this, options, instance, create_fragment, safe_not_equal, {});
      }
    }
    new App({
      target: document.getElementById("app")
    });
  }
});
export default require_index();
