import sys

file_path = 'app/subjects/english/our-world/[lessonId]/page.tsx'

with open(file_path, 'r') as f:
    content = f.read()

# 1. Update Grammar type
old_grammar_type = """type Grammar = {
  id: string;
  number: number;
  title: string;
  comingSoon: boolean;
  breadcrumb?: string;
  vocabulary?: { word: string; emoji: string }[];
  chart?: {
    rows: { question: string; answer: string }[];
    notes: string[];
  };
  examples?: { question: string; answer: string }[];
  quiz?: { question: string; options: string[]; correct: number }[];
  gameSentences?: string[][];
};"""

new_grammar_type = """type Grammar = {
  id: string;
  number: number;
  title: string;
  comingSoon: boolean;
  breadcrumb?: string;
  vocabulary?: { word: string; emoji: string }[];
  chart?: {
    rows: { question: string; answer: string }[];
    notes: string[];
  };
  examples?: { question: string; answer: string }[];
  levelUp?: {
    title: string;
    content: string;
    categories: {
      label: string;
      color: string;
      examples: { question: string; answer: string }[];
    }[];
  };
  quiz?: { question: string; options: string[]; correct: number }[];
  gameSentences?: string[][];
};"""

content = content.replace(old_grammar_type, new_grammar_type)

# 2. Add LevelUpTab component before LessonTab
level_up_tab_code = """// ─── Level Up Tab ────────────────────────────────────────────────────────────
function LevelUpTab({ levelUp }: { levelUp: NonNullable<Grammar['levelUp']> }) {
  return (
    <div className="space-y-10">
      {/* Mini Lesson Box */}
      <div className="bg-primary/5 border border-primary/15 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">💡</span>
          <h3 className="text-xl font-bold text-primary">{levelUp.title}</h3>
        </div>
        <p className="text-on-surface-variant leading-relaxed">
          {levelUp.content}
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-12">
        {levelUp.categories.map((cat, i) => (
          <div key={i}>
            <div className="flex items-center gap-3 mb-6">
              <span className={`px-3 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-widest ${cat.color}`}>
                {cat.label}
              </span>
              <div className="h-px bg-outline-variant/20 flex-1" />
            </div>

            <div className="grid gap-4">
              {cat.examples.map((ex, j) => (
                <div
                  key={j}
                  className="bg-surface-container-lowest rounded-2xl px-6 py-5 shadow-[0_12px_32px_-4px_rgba(24,28,29,0.06)] flex items-start gap-4 hover:-translate-y-0.5 transition-transform"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-sm">auto_awesome</span>
                  </div>
                  <div>
                    <p className="font-bold text-on-surface text-base">{ex.question}</p>
                    <p className="text-on-surface-variant mt-1">{ex.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"""

if "// ─── Lesson Tab ──" in content:
    content = content.replace("// ─── Lesson Tab ──", level_up_tab_code + "// ─── Lesson Tab ──")

# 3. Update tab state type and tabs array
content = content.replace(
    "const [tab, setTab] = useState<'lesson' | 'quiz' | 'game'>('lesson');",
    "const [tab, setTab] = useState<'lesson' | 'levelUp' | 'quiz' | 'game'>('lesson');"
)

old_tabs_array = """  const tabs: { id: typeof tab; label: string; icon: string }[] = [
    { id: 'lesson', label: 'Lesson', icon: 'menu_book' },
    { id: 'quiz', label: 'Quiz', icon: 'quiz' },
    { id: 'game', label: 'Game', icon: 'sports_esports' },
  ];"""

new_tabs_array = """  const tabs: { id: typeof tab; label: string; icon: string; emoji?: string }[] = [
    { id: 'lesson', label: 'Lesson', icon: 'menu_book' },
    { id: 'levelUp', label: 'Level Up', icon: 'rocket', emoji: '🚀' },
    { id: 'quiz', label: 'Quiz', icon: 'quiz' },
    { id: 'game', label: 'Game', icon: 'sports_esports' },
  ];"""

content = content.replace(old_tabs_array, new_tabs_array)

# 4. Update tab button rendering to handle emoji
old_tab_button = """              <span className="material-symbols-outlined text-[18px]">{t.icon}</span>
              {t.label}"""

new_tab_button = """              {t.emoji ? (
                <span className="text-base">{t.emoji}</span>
              ) : (
                <span className="material-symbols-outlined text-[18px]">{t.icon}</span>
              )}
              {t.label}"""

content = content.replace(old_tab_button, new_tab_button)

# 5. Update tab content rendering
old_tab_content = """        {/* Tab content */}
        {tab === 'lesson' && <LessonTab grammar={grammar} />}
        {tab === 'quiz' && grammar.quiz && <QuizTab quiz={grammar.quiz} />}
        {tab === 'game' && grammar.gameSentences && <GameTab sentences={grammar.gameSentences} />}"""

new_tab_content = """        {/* Tab content */}
        {tab === 'lesson' && <LessonTab grammar={grammar} />}
        {tab === 'levelUp' && grammar.levelUp && <LevelUpTab levelUp={grammar.levelUp} />}
        {tab === 'quiz' && grammar.quiz && <QuizTab quiz={grammar.quiz} />}
        {tab === 'game' && grammar.gameSentences && <GameTab sentences={grammar.gameSentences} />}"""

content = content.replace(old_tab_content, new_tab_content)

with open(file_path, 'w') as f:
    f.write(content)
