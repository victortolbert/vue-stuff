<template>
  <div class="p-8 prose">
    <dl>
      <dt>HTML</dt>
      <dd>HyperText Markup Language</dd>
      <dt>CSS</dt>
      <dd>Cascading Style Sheets</dd>
      <dt>SVG</dt>
      <dd>Scalable Vector Graphics</dd>
    </dl>

    <!-- <picture>
      <source srcset="/media/cc0-images/surfer-240-200.jpg" media="(orientation: portrait)">
      <img src="/media/cc0-images/painted-hand-298-332.jpg" alt="">
    </picture> -->

    <figure>
      <img src="https://images.unsplash.com/photo-1684077140580-cd2cb0987ef2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&amp;q=80" alt="">
      <figcaption>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</figcaption>
    </figure>

    <p>
      <abbr title="fear of missing out">FOMO</abbr>
      <code>rgb()</code>
    </p>

    <p>
      <q>A fine quotation is a diamond on the finger of a man of wit, and a pebble in the hand of a fool</q>. -<cite>Joseph Roux, Meditaions of a Parish Priest</cite>
    </p>

    <div>
      <figure>
        <pre><code class="language-html">&lt;article class="prose"&gt;
        &lt;h1&gt;Garlic bread with cheese: What the science tells us&lt;/h1&gt;
        &lt;p&gt;
      For years parents have espoused the health benefits of eating garlic bread with cheese to their
      children, with the food earning such an iconic status in our culture that kids will often dress
      up as warm, cheesy loaf for Halloween.
        &lt;/p&gt;
        &lt;p&gt;
      But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases
      springing up around the country.
        &lt;/p&gt;
        &lt;!-- ... --&gt;
      &lt;/article&gt;
      </code></pre><figcaption>This caption should be closer to the code block above </figcaption>
      </figure>
    </div>

    <p>A <dfn>header</dfn> is an element that appears at the top of the page.</p>

    <p class="lead">
      For example, type <kbd>Helvetica</kbd> and then press <kbd>Enter</kbd>.
    </p>

    <p>Futura is a geometric sans-serif typeface that was <mark>designed by Paul Renner in 1927</mark>.</p>

    <pre><code>
          function helloWorld() {
            // Greet the reader
            alert('Hello World!');
          }
          </code></pre>

    <p>On sale now for <s>$12.99</s> $9.99.</p>

    <p>The error message said <samp>Comic Sans!? Are you kidding me!?</samp>.</p>

    <p>
      Thank you for reading this essay.<br>
      <small>TypeNerds is &copy; 2019 Aldus Manutius. All rights reserved.</small>
    </p>

    <p>
      Many illustrated manuscripts are written using iron gall ink, which is iron
      sulfate (FeSO<sub>4</sub>) added to gallic acid (C<sub>7</sub>H<sub>6</sub>O<sub>5</sub>).
    </p>

    <p>The W3C standard cautions us not to use subscripts and superscripts "for typographical presentation for presentation's sake."<sup>[1]</sup></p>

    <p>This page was last modified on <time datetime="2019-08-23T09:25:00-05:00">August 23rd, 2019 at 9:25AM</time></p>

    <p>It's a really bad idea to use the <code>u</code> element because its text <u>looks just like a link</u>.</p>

    <p>Here's the syntax to use for the <code>time</code> element:<br></p>

    <p><code>&lt;time datetime="<var>machine-value</var>"&gt;<var>human text</var>&lt;/&gt;.</code></p>

    <p>Movable type was invented by <span>Johannes Gutenberg</span> in the mid-fifteenth century. The first printing press in England was set up by <span>William Caxton</span> in 1876.</p>
  </div>
</template>
