package Quiz;

public class Question {
    private String spm;
    private Svar [] svar;
    private int time;
    private int riktig;

    public Question() {

    }

    public String getSpm() {
        return spm;
    }

    public void setSpm(String spm) {
        this.spm = spm;
    }

    public Svar[] getSvar() {
        return svar;
    }

    public void setSvar(Svar[] svar) {
        this.svar = svar;
//        System.out.println("svar1 = " + svar[0].toString());
    }

    public int getTime() {
        return time;
    }

    public void setTime(int time) {
        this.time = time;
    }

    public int getRiktig() {
        return riktig;
    }

    public void setRiktig(String riktig) {
        this.riktig = Integer.parseInt(riktig);
    }
}
