package Quiz;

public class Spiller {
    private String nick;
    private int score;
    private int id;

    public Spiller() {
    }

    public String getNick() {
        return nick;
    }

    public void setNick(String nick) {
        this.nick = nick;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void addScore(int pnts){
        score+=pnts;
    }
}
