package Quiz;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class Quiz {
    private String id;
    private String navn;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss.SSS")
    private Date start;
    private Question [] spms;
    private Spiller spiller;

    public Quiz(){
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNavn() {
        return navn;
    }

    public void setNavn(String navn) {
        System.out.println("navn = " + navn);
        this.navn = navn;
    }

    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public Question[] getSpms() {
        return spms;
    }

    public void setSpms(Question[] spm) {
        this.spms = spm;
    }


    public Spiller getSpiller() {
        return spiller;
    }

    public void setSpiller(Spiller spiller) {
        this.spiller = spiller;
//        System.out.println(spiller.getNick());
    }

    public void addScore(int pnts){
        spiller.addScore(pnts);
    }

    public void wipeScore() {
        spiller.setScore(0);
    }
}
