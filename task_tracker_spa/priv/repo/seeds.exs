# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     TaskTrackerSpa.Repo.insert!(%TaskTrackerSpa.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias TaskTrackerSpa.Repo
alias TaskTrackerSpa.Users.User

pwhash = Argon2.hash_pwd_salt("password")

Repo.insert!(%User{email: "alice@example.com", password_hash: pwhash})
Repo.insert!(%User{email: "bob@example.com", password_hash: pwhash})

alias TaskTrackerSpa.Tasks.Task

Repo.insert!(%Task{name: "Complete Web Dev", desc: "Complete task tracker single page", time: 45, complete: false, user_id: 1})
Repo.insert!(%Task{name: "Write English Paper", desc: "Compelte final paper for advanced writing", time: 30, complete: true, user_id: 2})
