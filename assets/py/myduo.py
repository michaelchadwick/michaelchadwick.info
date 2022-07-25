import os
import duolingo

duo_user = os.environ.get('DUOLINGO_USER')
duo_pass = os.environ.get('DUOLINGO_PASS')

lingo = duolingo.Duolingo(duo_user, duo_pass)

langs_disp = lingo.get_languages
langs_abbr = lingo.get_languages(abbreviations=True)

for lang in langs_abbr:
  print(lingo.get_language_progress(lang))

# print(langs_disp)
# print(lingo.get_streak_info())