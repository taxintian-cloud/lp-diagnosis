const results = {
  complete: `【大きな問題はありません】\n
あなたのWeb導線は整理されており、
予約までの流れはしっかり作られています。

ただし、
細かい改善を行うだけで
予約率がさらに伸びる可能性があります。

実際、この段階の方は
CTAの位置や文章を少し調整するだけで
反応が変わるケースが多いです。

あなたの回答内容をもとに、
「最短で予約率を上げる改善ポイント」を
1つに絞って具体的にお伝えします。

▼1分で個別アドバイスを受け取る
（完全無料・営業なし）`,

  warning: `【少し改善の余地があります】\n
現在のWeb導線では、
いくつか小さな迷いが生まれている可能性があります。

この状態だと、
訪問者は興味を持っても
予約直前で離脱してしまうことがあります。

ですが、
順序や言葉を整えるだけで
予約率が改善するケースは多く見られます。

あなたの回答内容をもとに、
「まず最初に直すべき1点」を
具体的にお伝えします。

▼1分で個別アドバイスを受け取る
（完全無料・営業なし）
➡️ <a href="https://docs.google.com/forms/d/e/1FAIpQLScS41dRZa3WmmOx4h03fwszXnRAtXHIfToGWneYuGzeDHz4Tg/viewform?usp=publish-editor" target="_blank">無料相談はこちら</a>`,

  alert: `【このままだと予約が入りにくい状態です】\n
現在のWeb導線では、
訪問者が途中で迷い、
離脱してしまう可能性が高いです。

この状態のままだと、
SNSを頑張っても予約につながりにくく、
時間だけが過ぎてしまうケースが多く見られます。

しかし、
導線の順序と見せ方を整えるだけで
予約率は大きく改善する可能性があります。

あなたの回答内容をもとに、
「最短で予約につなげる改善ポイント」を
1つに絞って具体的にお伝えします。

▼1分で個別アドバイスを受け取る
（完全無料・営業なし）
➡️ <a href="https://docs.google.com/forms/d/e/1FAIpQLScS41dRZa3WmmOx4h03fwszXnRAtXHIfToGWneYuGzeDHz4Tg/viewform?usp=publish-editor" target="_blank">無料相談はこちら</a>`,

  critical: `【本格的な見直しが必要な状態です】\n
現在のWeb導線では、
訪問者が予約まで辿り着かず
機会損失が起きている可能性が高いです。

このまま運用を続けても、
努力に対して成果が出にくい状態になっています。

ですが安心してください。
導線の構造を整理することで、
予約につながる流れを
最短で作り直すことが可能です。

あなたの回答内容をもとに、
「優先して直すべき改善点」を
具体的にお伝えします。

▼1分で個別アドバイスを受け取る
（完全無料・営業なし）
➡️ <a href="https://docs.google.com/forms/d/e/1FAIpQLScS41dRZa3WmmOx4h03fwszXnRAtXHIfToGWneYuGzeDHz4Tg/viewform?usp=publish-editor" target="_blank">無料相談はこちら</a>`
};

// 選択肢ごとのスコア
const scoreMap = {
  experience: { none: 0, some: 1, much: 2 },
  sns: { low: 0, medium: 1, high: 2 },
  reservation: { dm: 0, form: 1, both: 2 },
  problem: { no_reserve: 0, sns_continue: 1, lp_unclear: 0 },
  goal: { increase: 1, stabilize: 1, web_improve: 1, revenue: 2 },
  self_eval: { perfect: 2, ok: 1, needs: 0 }
};

function calculateScore() {
    let score = 0;

    const experience = document.getElementById('experience').value;
    const sns = document.getElementById('sns').value;
    const reservation = document.getElementById('reservation').value;
    const problem = document.getElementById('problem').value;
    const goal = document.getElementById('goal').value;
    const selfEval = document.getElementById('self_eval').value;

    // 名前はスコアに関係なし
    if (scoreMap.experience[experience] !== undefined) score += scoreMap.experience[experience];
    if (scoreMap.sns[sns] !== undefined) score += scoreMap.sns[sns];
    if (scoreMap.reservation[reservation] !== undefined) score += scoreMap.reservation[reservation];
    if (scoreMap.problem[problem] !== undefined) score += scoreMap.problem[problem];
    if (scoreMap.goal[goal] !== undefined) score += scoreMap.goal[goal];
    if (scoreMap.self_eval[selfEval] !== undefined) score += scoreMap.self_eval[selfEval];

    return score;
}

function determineResult(score) {
    if (score >= 9) return 'complete';
    if (score >= 6) return 'warning';
    if (score >= 3) return 'alert';
    return 'critical';
}

function showResult(type) {
    const resultDiv = document.getElementById('result');
    resultDiv.className = '';
    resultDiv.classList.add(type);
    resultDiv.innerHTML = results[type];
    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({behavior: 'smooth'});
}

document.querySelector('.submit-btn').addEventListener('click', () => {
    const score = calculateScore();
    const resultType = determineResult(score);
    showResult(resultType);
});
