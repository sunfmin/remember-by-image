/* ============================================================
   右脑记忆课程 · 可复用测验组件
   用法（在 lesson HTML 里）：

   自由回忆测试（按顺序默写一组词）：
     <div id="recall1"></div>
     <script>
       Course.recallTest(document.getElementById('recall1'), {
         items: ['苹果', '火山', ...],
         ordered: true,                  // false = 顺序不限
         placeholder: '第 {n} 个',
       });
     </script>

   选择题测验（注意：所有选项字数应相同，避免格式泄露答案）：
     <div id="quiz1"></div>
     <script>
       Course.quiz(document.getElementById('quiz1'), [
         { q: '问题?', options: ['甲','乙','丙'], answer: 1,
           explain: '解释为什么。' },
       ]);
     </script>
   ============================================================ */

window.Course = (function () {
  function norm(s) {
    return (s || '').trim().replace(/\s+/g, '');
  }

  /* ---------- 自由回忆测试 ---------- */
  function recallTest(container, opts) {
    var items = opts.items;
    var ordered = opts.ordered !== false;
    var placeholder = opts.placeholder || '第 {n} 个';

    container.classList.add('recall-test');

    var grid = document.createElement('div');
    grid.className = 'recall-inputs';
    var inputs = items.map(function (_, i) {
      var input = document.createElement('input');
      input.type = 'text';
      input.autocomplete = 'off';
      input.placeholder = placeholder.replace('{n}', i + 1);
      grid.appendChild(input);
      return input;
    });
    container.appendChild(grid);

    var btn = document.createElement('button');
    btn.className = 'check';
    btn.textContent = '检查答案';
    container.appendChild(btn);

    var result = document.createElement('div');
    result.className = 'result';
    container.appendChild(result);

    btn.addEventListener('click', function () {
      var correct = 0;
      if (ordered) {
        inputs.forEach(function (input, i) {
          var hit = norm(input.value) === norm(items[i]);
          input.classList.toggle('ok', hit);
          input.classList.toggle('err', !hit);
          if (hit) correct++;
        });
      } else {
        var remaining = items.map(norm);
        inputs.forEach(function (input) {
          var v = norm(input.value);
          var idx = remaining.indexOf(v);
          var hit = v !== '' && idx !== -1;
          if (hit) remaining.splice(idx, 1);
          input.classList.toggle('ok', hit);
          input.classList.toggle('err', !hit);
          if (hit) correct++;
        });
      }
      result.className = 'result show ' + (correct === items.length ? 'good' : 'bad');
      if (correct === items.length) {
        result.textContent = '全对！' + correct + '/' + items.length +
          ' —— 图像链条完整地留在了你的脑子里。';
      } else {
        result.textContent = '答对 ' + correct + '/' + items.length +
          '。回到故事里：卡住的地方，往往是图像不够夸张、不够动态的地方。把那一环改造得更荒诞，再试一次。';
      }
    });
  }

  /* ---------- 选择题测验 ---------- */
  function quiz(container, questions) {
    container.classList.add('quiz');

    questions.forEach(function (q, qi) {
      var qDiv = document.createElement('div');
      qDiv.className = 'quiz-q';

      var qText = document.createElement('div');
      qText.className = 'q-text';
      qText.textContent = (qi + 1) + '. ' + q.q;
      qDiv.appendChild(qText);

      var labels = [];
      var answered = false;

      q.options.forEach(function (opt, oi) {
        var label = document.createElement('label');
        var radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'q' + qi + '-' + Math.floor(performance.now());
        label.appendChild(radio);
        label.appendChild(document.createTextNode(opt));
        labels.push(label);

        radio.addEventListener('change', function () {
          if (answered) return;
          answered = true;
          labels.forEach(function (l, li) {
            l.classList.toggle('ok', li === q.answer);
            if (li === oi && oi !== q.answer) l.classList.add('err');
            l.querySelector('input').disabled = true;
          });
          if (q.explain) {
            var ex = document.createElement('div');
            ex.className = 'result show ' + (oi === q.answer ? 'good' : 'bad');
            ex.textContent = (oi === q.answer ? '正确。' : '不对。') + q.explain;
            qDiv.appendChild(ex);
          }
        });

        qDiv.appendChild(label);
      });

      container.appendChild(qDiv);
    });
  }

  return { recallTest: recallTest, quiz: quiz };
})();
