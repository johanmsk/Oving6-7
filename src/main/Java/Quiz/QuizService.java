package Quiz;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Path("/quiz/")
public class QuizService {
	private static Map<String, Quiz> quizzer = new HashMap<String,Quiz>();
	private static Map<String, Score> scores= new HashMap<String,Score>();
	private static int currentQ;
	private static String quiz;

	public QuizService (){

    }

    @GET
    @Path("/setup")
    @Produces(MediaType.APPLICATION_JSON)
    public void setup(){
        Quiz q = new Quiz();
        q.setId("1");
        q.setNavn("navn1");
        q.setStart(new Date());

        Question spm1 = new Question();
        spm1.setSpm("Hva er b?");
        spm1.setRiktig(""+2);
        spm1.setTime(10);
        Svar a= new Svar();
        Svar b= new Svar();
        Svar c= new Svar();
        Svar d= new Svar();
        a.setSvar("a");
        b.setSvar("b");
        c.setSvar("c");
        d.setSvar("d");
        spm1.setSvar(new Svar[]{a,b,c,d});

        Question spm2 = new Question();
        spm2.setSpm("Hva er c?");
        spm2.setRiktig(""+3);
        spm2.setTime(10);
        spm2.setSvar(new Svar[]{a,b,c,d});

        Question spm3 = new Question();
        spm3.setSpm("Hva er d?");
        spm3.setRiktig(""+4);
        spm3.setTime(10);
        spm3.setSvar(new Svar[]{a,b,c,d});

        q.setSpms(new Question[]{spm1,spm2,spm3});
        Spiller p = new Spiller();
        p.setNick("abc");
        p.setScore(0);
        q.setSpiller(p);
        quizzer.put(q.getId(),q);


        currentQ=0;
        quiz=""+1;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Collection<Quiz> getQuizzer() {
        return quizzer.values();
    }

    @GET
    @Path("/scores")
    @Produces(MediaType.APPLICATION_JSON)
    public Collection<Score> getScores() {
        return scores.values();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void addQuiz(Quiz q){
        q.setId("" + (quizzer.size() + 1));
        quizzer.put(q.getId(), q);
    }

    @POST
    @Path("/CurrentQuestion/{questionId}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void setCurrent(@PathParam("questionId") int questionId){
        currentQ = questionId;
        System.out.println(currentQ);
    }

    @GET
    @Path("/CurrentQuestion")
    @Produces(MediaType.APPLICATION_JSON)
    public int getCurrentQuestion(){
        return currentQ;
    }

    @POST
    @Path("/setQuiz/{quizId}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void setQuiz(@PathParam("quizId") String quizId){
        this.quiz = quizId;
        System.out.println(this.quiz);
    }

    @POST
    @Path("/{quizId}/{nick}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void setNick(@PathParam("quizId") String quizId, @PathParam("nick") String nick, Spiller spiller){
        if(quizzer.containsKey(quizId)){
            quizzer.get(quizId).setSpiller(spiller);
            String nickers=quizzer.get(quizId).getSpiller().getNick();
            System.out.println("nick = " + nickers);
        } else {
            throw new NotFoundException();
        }
    }

    @GET
    @Path("/{quizId}/{nick}/getScore")
    @Produces(MediaType.APPLICATION_JSON)
    public int getScore(@PathParam("quizId") String quizId, @PathParam("nick") String nick){
        if(quizzer.containsKey(quizId)){
            return quizzer.get(quizId).getSpiller().getScore();
        } else {
            throw new NotFoundException();
        }
    }

    @POST
    @Path("/{quizId}/{nick}/{pnts}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void addScore(@PathParam("quizId") String quizId, @PathParam("nick") String nick, @PathParam("pnts") int pnts){
        if(quizzer.containsKey(quizId)){
            quizzer.get(quizId).addScore(pnts);
        } else {
            throw new NotFoundException();
        }
    }

    @GET
    @Path("/getNick/{quizId}")
    public String getNick(@PathParam("quizId") String quizId){
        if(quizzer.containsKey(quizId)){
            String nick=quizzer.get(quizId).getSpiller().getNick();
            System.out.println("nick = " + nick);
            return nick;
        }else{
            throw new NotFoundException();
        }
    }

    @GET
    @Path("/CurrentQuestion/{quizId}/{spmId}")
    @Produces(MediaType.TEXT_PLAIN)
    public String getSpm(@PathParam("quizId") String quizId,
                         @PathParam("spmId") int spmId){
        return quizzer.get(quizId).getSpms()[spmId].getSpm();
    }

    @GET
    @Path("/getCurrentQuiz")
    @Produces(MediaType.TEXT_PLAIN)
    public String getQuizId(){
        return quiz;
    }

    @GET
    @Path("/{quizId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Quiz getQuiz(@PathParam("quizId") String quizId) {
        if(quizzer.containsKey(quizId)){
            return quizzer.get(quizId);
        } else {
            throw new NotFoundException();
        }
    }

    @GET
    @Path("/{quizId}/getName")
    @Produces(MediaType.TEXT_PLAIN)
    public String getQuizName(@PathParam("quizId") String quizId){
        if(quizzer.containsKey(quizId)){
            return quizzer.get(quizId).getNavn();
        } else {
            throw new NotFoundException();
        }
    }

    @GET
    @Path("/getStart/{quizId}")
    @Produces(MediaType.TEXT_PLAIN)
    public String getQuizStartTime(@PathParam("quizId") String quizId){
        if(quizzer.containsKey(quizId)){
            return quizzer.get(quizId).getStart().toString();
        } else {
            throw new NotFoundException();
        }
    }

    @GET
    @Path("/{quizId}/{questionIndex}/{answerIndex}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAnswer(@PathParam("quizId") String quizId,
                                   @PathParam("questionIndex") int questionIndex,
                                   @PathParam("answerIndex") int altIndex){
        if(quizzer.containsKey(quizId)){
            String out="Spm eller svar ikke funntet";
            out = quizzer.get(quizId).getSpms()[questionIndex].getSvar()[altIndex].toString();
            return out;
        } else {
            throw new NotFoundException();
        }
    }

    @GET
    @Path("{quizId}/{questionIndex}")
    @Produces(MediaType.APPLICATION_JSON)
    public int getCorrect(@PathParam("quizId") String quizId,
                          @PathParam("questionIndex") int questionIndex){
        if(quizzer.containsKey(quizId)){
            int c= -1;
            c=quizzer.get(quizId).getSpms()[questionIndex].getRiktig();
            return c;
        } else {
            throw new NotFoundException();
        }
    }

    @POST
    @Path("/nextQ")
    @Consumes(MediaType.APPLICATION_JSON)
    public void nextQ(){
       currentQ+=1;
    }

    @GET
    @Path("/{quizId}/{spmId}/getTimeLeft")
    @Produces(MediaType.APPLICATION_JSON)
    public int getTimeLeft(@PathParam("quizId") String quizId, @PathParam("spmId") int spmId){
        if(quizzer.containsKey(quizId)){
            int c= -1;
            c=quizzer.get(quizId).getSpms()[spmId].getTime();
            return c;
        } else {
            throw new NotFoundException();
        }
    }

    @GET
    @Path("/{quizId}/getNumberQ")
    @Produces(MediaType.APPLICATION_JSON)
    public int getNumberOfQuestions(@PathParam("quizId") String quizId){
        if(quizzer.containsKey(quizId)){
            int c= -1;
            c=quizzer.get(quizId).getSpms().length-1;
            return c;
        } else {
            throw new NotFoundException();
        }
    }

    @POST
    @Path("/nyScore")
    @Consumes(MediaType.APPLICATION_JSON)
    public void addScore(Score nyScore) {
        String id = ""+(scores.size()+1);
        scores.put(id, nyScore);
    }

    @GET
    @Path("/reset")
    @Produces(MediaType.APPLICATION_JSON)
    public void wipeScore(){
        quizzer.get(quiz).wipeScore();
    }


//    @GET
//    @Path("/{quizId}")
//    @Produces(MediaType.APPLICATION_JSON)
//    public Kunde getKunde(@PathParam("quizId") String kundeId) {
//        if(quizzer.containsKey(kundeId)){
//            return quizzer.get(kundeId);
//        }else{
//            throw new NotFoundException();
//        }
//    }
//
//    @POST
//    @Consumes(MediaType.APPLICATION_JSON)
//    public void addKunde(Kunde kunde) {
//        if(!quizzer.containsKey(kunde.getId())){
//            quizzer.put(kunde.getId(), kunde);
//        }else throw new BadRequestException();
//    }
//
//    @DELETE
//    @Path("/{quizId}")
//    public void deleteKunde(@PathParam("quizId") String id){
//        quizzer.remove(id);
//    }
//
//    @PUT
//    @Path("/{quizId}")
//    @Consumes(MediaType.APPLICATION_JSON)
//    public void updateKunde(@PathParam("quizId") String id, Kunde kunde){
//        if(quizzer.containsKey(id)){
//            quizzer.put(id,kunde);
//        }else{
//            throw new NotFoundException();
//        }
//    }

}
