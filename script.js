const results = {
  complete: `問題なさそうですね！\n
あなたのWeb導線は整理されていて、大きな問題はありません。
さらに細かい部分を見直すと、予約率が上がる可能性があります。
CTAの位置や色、文章の順番を少し調整するだけでも効果があります。`,

  warning: `少し改善の余地があります。\n
いくつか小さな迷いがある箇所が見受けられます。
ここを整理するだけでも、訪問者の行動がスムーズになり、予約率の向上が期待できます。
フォームの順序や説明文の言葉遣いを調整すると効果的です。
\n\n詳細な相談はメールでも受け付けています。
➡️ <a href="https://docs.google.com/forms/d/e/1FAIpQLScS41dRZa3WmmOx4h03fwszXnRAtXHIfToGWneYuGzeDHz4Tg/viewform?usp=publish-editor" target="_blank">無料相談はこちら</a>`,

  alert: `改善が必要です。\n
Web導線の一部で訪問者が迷っている箇所があります。
順序や情報の見せ方を整えることで、予約率を大幅に上げることが可能です。
説明文の強調箇所や入力フォームの見やすさを改善すると良いでしょう。
\n\n詳細な相談はメールでも受け付けています。
➡️ <a href="https://docs.google.com/forms/d/e/1FAIpQLScS41dRZa3WmmOx4h03fwszXnRAtXHIfToGWneYuGzeDHz4Tg/viewform?usp=publish-editor" target="_blank">無料相談はこちら</a>`,

  critical: `本格的な見直しをおすすめします。\n
入力内容から判断すると、導線の構造に問題があります。
一緒に整理して、最短で問い合わせまで誘導できる形にすることが重要です。
フォームのステップ設計や誘導文の改善を行い、訪問者が迷わず行動できる構造にしましょう。
\n\n詳細な相談はメールでも受け付けています。
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
